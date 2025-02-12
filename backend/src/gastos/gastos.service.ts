import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto) private gastoRepository: Repository<Gasto>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) {}
  async create(createGastoDto: CreateGastoDto): Promise<Gasto> {
    const { usuarioID } = createGastoDto;
    try {
      // verificar que el usuario existe
        const usuario = await this.usuariosRepository.findOne({ where: {id: usuarioID, deletedAt: null} })
        if(!usuario) throw new NotFoundException('Usuario no encontrado')
        
        // crear Gasto
        const gasto = this.gastoRepository.create(createGastoDto);
        if (!gasto) throw new InternalServerErrorException('No se pudo crear el gasto.');

        // guardar Gasto
        const guardarGasto = await this.gastoRepository.save(gasto);
        if (!guardarGasto) throw new InternalServerErrorException('No se pudo guardar el gasto.');

        return guardarGasto
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el gasto: ${error.message}`);
    }
  }

  async findAll(): Promise<Gasto[]> {
    try {
      const gastos = await this.gastoRepository.find({ where: {deletedAt: null}, relations: ['usuario'] });
      if (!gastos) throw new InternalServerErrorException('No se encontraron gastos.');
      return gastos;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar los gastos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Gasto> {
    try {
      const gasto = await this.gastoRepository.findOne({ where: {id, deletedAt: null}, relations: [ 'usuario'] });
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');
      return gasto;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar el gasto: ${error.message}`);     
    }
  }

  async update(id: number, updateGastoDto: UpdateGastoDto) {
    try {
      const gasto = await this.findOne(id);
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');

      //verificar si hay datos en los campos a actualizar
      const tieneDatosParaActualizar = Object.values(updateGastoDto).some(values => values !== null && values !== undefined);
      if (!tieneDatosParaActualizar) throw new InternalServerErrorException('No hay datos para actualizar.');

      // Actualizar solo los campos que tengan datos
      Object.keys(updateGastoDto).forEach(key => {
        if(updateGastoDto[key] !== null && updateGastoDto[key] !== undefined){
          gasto[key] = updateGastoDto[key];
        }
      })

      // Guardar los cambios
      const gastoActualizado = await this.gastoRepository.save(gasto);

      return gastoActualizado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el gasto: ${error.message}`);
    }
  }

    async softDelete(id: number): Promise<{message: string}> {
      try {
        // buscar la gasto por id
        const gasto = await this.gastoRepository.findOne({ where: { id, deletedAt: null } })
  
        // si no encuentra nada
        if (!gasto) throw new NotFoundException('No se encontro la compra')
  
        // actualizar el gasto
        gasto.deletedAt = new Date()
  
        // guardar la compra
        await this.gastoRepository.save(gasto)
  
        // devolver mensaje de exito
        return {message: "compra eliminada correctamente"}
      } catch (error) {
        throw new BadRequestException('Error al eliminar la compra', error.message)
      }
    }
  
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
    async cleanDeletedRecords() {
      try {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 30); // Fecha límite (30 días atrás)
  
        const gastosEliminar = await this.gastoRepository.find({
          where: {
            deletedAt: In([LessThan(fechaLimite)]), // gastos con deletedAt anterior al límite
          },
        });
  
        if (gastosEliminar.length > 0) {
          await this.gastoRepository.remove(gastosEliminar); // Eliminación definitiva
          console.log(`Eliminados ${gastosEliminar.length} gastos obsoletas.`);
        }
      } catch (error) {
        console.error('Error al limpiar registros eliminados:', error);
        throw new InternalServerErrorException(
          'Ocurrió un error al eliminar gastos obsoletos.', error.message,
        );
      }
    }

  async remove(id: number) {
   try {
      const gasto = await this.gastoRepository.findOneBy({ id });
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');
      const gastoEliminado = await this.gastoRepository.delete({ id: gasto.id });
      if (!gastoEliminado) throw new InternalServerErrorException('No se pudo eliminar el gasto.');
      return gastoEliminado;
   } catch (error) {
     throw new InternalServerErrorException(`Error al eliminar el gasto: ${error.message}`);    
   }
  }
}
