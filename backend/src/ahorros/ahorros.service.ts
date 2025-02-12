import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';
import { Ahorro } from './entities/ahorro.entity';
import { In, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AhorrosService {
  constructor(
        @InjectRepository(Ahorro) private ahorroRepository: Repository<Ahorro>,
        @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
      ) {}

  async create(createAhorroDto: CreateAhorroDto):Promise<Ahorro> {
    const { usuarioID } = createAhorroDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: {id: usuarioID, deletedAt: null} })
      if(!usuario) throw new NotFoundException('Usuario no encontrado')

      // crear Ahorro
      const ahorro = this.ahorroRepository.create(createAhorroDto);
      if (!ahorro) throw new InternalServerErrorException('No se pudo crear el ahorro.');

      const guardarAhorro = await this.ahorroRepository.save(ahorro);
      if (!guardarAhorro) throw new InternalServerErrorException('No se pudo guardar el ahorro.');

      return guardarAhorro;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ahorro: ${error.message}`);
    }
  }

  async findAll(): Promise<Ahorro[]> {
    try {
      const ahorros = await this.ahorroRepository.find({ where: {deletedAt: null}, relations: ['usuario'] });

      if (!ahorros) throw new InternalServerErrorException('No se encontraron ahorros.');

      return ahorros;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar los ahorros: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Ahorro> {
    try {
      const ahorro = await this.ahorroRepository.findOne({ where: {id, deletedAt: null}, relations: [ 'usuario'] });

      if (!ahorro) throw new InternalServerErrorException('No se encontró el ahorro.');

      return ahorro;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar el ahorro: ${error.message}`);
    }
  }

  async update(id: number, updateAhorroDto: UpdateAhorroDto): Promise<Ahorro> {
    try {
      // Verificar que el ahorro existe
      const ahorro = await this.ahorroRepository.findOne({ where: { id, deletedAt: null } });

      if (!ahorro) {
        throw new NotFoundException('Ahorro no encontrado');
      }
  
      // Verificar si hay datos en los campos a actualizar
      const tieneDatosParaActualizar = Object.values(updateAhorroDto).some(value => value !== null && value !== undefined);

      if (!tieneDatosParaActualizar) {
        throw new BadRequestException('No se encontraron datos para actualizar');
      }
  
      // Actualizar solo los campos que tienen valores no nulos
      Object.keys(updateAhorroDto).forEach(key => {
        if (updateAhorroDto[key] !== null && updateAhorroDto[key] !== undefined) {
          ahorro[key] = updateAhorroDto[key];
        }
      });
  
      // Guardar la actualización del ahorro
      const ahorroActualizado = await this.ahorroRepository.save(ahorro);
      if(!ahorroActualizado) {
        throw new InternalServerErrorException('No se pudo actualizar el ahorro');
      }
  
      // Devolver el ahorro actualizado
      return ahorroActualizado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el ahorro: ${error.message}`);
    }
  }
  async softDelete(id: number): Promise<{message: string}> {
    try {
      // buscar la ahorro por id
      const ahorro = await this.ahorroRepository.findOne({ where: { id, deletedAt: null } })

      // si no encuentra nada
      if (!ahorro) throw new NotFoundException('No se encontro la compra')

      // actualizar el ahorro
      ahorro.deletedAt = new Date()

      // guardar la compra
      await this.ahorroRepository.save(ahorro)

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

      const ahorrosEliminar = await this.ahorroRepository.find({
        where: {
          deletedAt: In([LessThan(fechaLimite)]), // ahorros con deletedAt anterior al límite
        },
      });

      if (ahorrosEliminar.length > 0) {
        await this.ahorroRepository.remove(ahorrosEliminar); // Eliminación definitiva
        console.log(`Eliminados ${ahorrosEliminar.length} ahorros obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar ahorros obsoletos.', error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      const ahorro = await this.ahorroRepository.findOneBy({ id });
      if (!ahorro) throw new InternalServerErrorException('No se encontró el ahorro.');
      const ahorroEliminado = await this.ahorroRepository.delete({ id: ahorro.id });
      if (!ahorroEliminado) throw new InternalServerErrorException('No se pudo eliminar el ahorro.');
      return ahorroEliminado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el ahorro: ${error.message}`);
    }
  }
}
