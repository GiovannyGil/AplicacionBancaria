import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class IngresosService {

  constructor(
    @InjectRepository(Ingreso) private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) { }

  async create(createIngresoDto: CreateIngresoDto): Promise<Ingreso> {
    const { usuarioID } = createIngresoDto;
    
    try {
      // Verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({
        where: { id: usuarioID, deletedAt: IsNull() }
      });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
  
      // Crear y asignar los valores del ingreso
      const ingreso = this.ingresoRepository.create({
        ...createIngresoDto,
        usuario: usuario, // Relación con el usuario
      });
  
      return await this.ingresoRepository.save(ingreso);
  
    } catch (error) {
      console.log('error al crear el ingreso', error);
      throw new InternalServerErrorException(`Error al crear el ingreso: ${error.message}`);
    }
  }
  

  async findAll(userId: number): Promise<Ingreso[]> {
    try {
      const ingresos = await this.ingresoRepository.find({ where: { deletedAt: IsNull(), usuario: { id: userId } }, relations: ['usuario'] });
      if (!ingresos) throw new InternalServerErrorException('No se encontraron ingresos.');
      return ingresos;
    } catch (error) {
      console.log('error al buscar los ingresos', error);
      throw new InternalServerErrorException(`Error al buscar los ingresos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Ingreso> {
    try {
      const ingreso = await this.ingresoRepository.findOne({ where: { id, deletedAt: IsNull() }, relations: ['usuario'] });
      if (!ingreso) throw new InternalServerErrorException('No se encontró el ingreso.');
      return ingreso;
    } catch (error) {
      console.log('error al buscar el ingreso', error);
      throw new InternalServerErrorException(`Error al buscar el ingreso: ${error.message}`);
    }
  }

  async update(id: number, updateIngresoDto: UpdateIngresoDto) {
    try {
      const ingreso = await this.findOne(id);
      if (!ingreso) throw new InternalServerErrorException('No se encontró el ingreso.');

      //verificar si hay datos en los campos a actualizar
      const tieneDatosParaActualizar = Object.values(updateIngresoDto).some(values => values !== null && values !== undefined);
      if (!tieneDatosParaActualizar) throw new InternalServerErrorException('No hay datos para actualizar.');

      // Actualizar solo los campos que tengan datos
      Object.keys(updateIngresoDto).forEach(key => {
        if (updateIngresoDto[key] !== null && updateIngresoDto[key] !== undefined) {
          ingreso[key] = updateIngresoDto[key];
        }
      })

      // Guardar los cambios
      const ingresoActualizado = await this.ingresoRepository.save(ingreso);

      return ingresoActualizado;
    } catch (error) {
      console.log('error al actualizar el ingreso', error);
      throw new InternalServerErrorException(`Error al actualizar el ingreso: ${error.message}`);
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      // buscar la ingreso por id
      const ingreso = await this.ingresoRepository.findOne({ where: { id, deletedAt: IsNull() } })

      // si no encuentra nada
      if (!ingreso) throw new NotFoundException('No se encontro la compra')

      // actualizar el ingreso
      ingreso.deletedAt = new Date()

      // guardar la compra
      await this.ingresoRepository.save(ingreso)

      // devolver mensaje de exito
      return { message: "compra eliminada correctamente" }
    } catch (error) {
      console.log('error al eliminar la compra', error);
      throw new BadRequestException('Error al eliminar la compra', error.message)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 30); // Fecha límite (30 días atrás)

      const ingresosEliminar = await this.ingresoRepository.find({
        where: {
          deletedAt: In([LessThan(fechaLimite)]), // ingresos con deletedAt anterior al límite
        },
      });

      if (ingresosEliminar.length > 0) {
        await this.ingresoRepository.remove(ingresosEliminar); // Eliminación definitiva
        console.log(`Eliminados ${ingresosEliminar.length} ingresos obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar ingresos obsoletos.', error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      const ingreso = await this.ingresoRepository.findOneBy({ id });
      if (!ingreso) throw new InternalServerErrorException('No se encontró el ingreso.');
      const ingresoEliminado = await this.ingresoRepository.delete({ id: ingreso.id });
      if (!ingresoEliminado) throw new InternalServerErrorException('No se pudo eliminar el ingreso.');
      return ingresoEliminado;
    } catch (error) {
      console.log('error al eliminar el ingreso', error);
      throw new InternalServerErrorException(`Error al eliminar el ingreso: ${error.message}`);
    }
  }
}
