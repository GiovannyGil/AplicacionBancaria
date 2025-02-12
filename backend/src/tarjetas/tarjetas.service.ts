import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TarjetasService {

  constructor(
    @InjectRepository(Tarjeta) private tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) { }

  async create(createTarjetaDto: CreateTarjetaDto): Promise<Tarjeta> {
    const { usuarioID } = createTarjetaDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: { id: usuarioID, deletedAt: null } })
      if (!usuario) throw new NotFoundException('Usuario no encontrado')

      // crear Tarjeta
      const tarjeta = this.tarjetaRepository.create(createTarjetaDto);
      if (!tarjeta) throw new InternalServerErrorException('No se pudo crear la tarjeta.');

      // guardar Tarjeta
      const guardarTarjeta = await this.tarjetaRepository.save(tarjeta);
      if (!guardarTarjeta) throw new InternalServerErrorException('No se pudo guardar la tarjeta.');

      return guardarTarjeta;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async findAll(): Promise<Tarjeta[]> {
    try {
      const tarjetas = await this.tarjetaRepository.find({ where: { deletedAt: null }, relations: ['usuario'] });
      if (!tarjetas) throw new InternalServerErrorException('No se encontraron tarjetas registradas.');
      return tarjetas;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Tarjeta> {
    try {
      const tarjeta = await this.tarjetaRepository.findOne({ where: { id, deletedAt: null }, relations: ['usuario'] });
      if (!tarjeta) throw new InternalServerErrorException('No se encontraro tarjeta registrada.');
      return tarjeta;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async update(id: number, updateTarjetaDto: UpdateTarjetaDto): Promise<Tarjeta> {
    try {
      //verificar que la tarjeta existe
      const tarjeta = await this.findOne(id);
      if (!tarjeta) throw new InternalServerErrorException('No se encontró la tarjeta.');

      // verificar si hay datos a modificar
      const tieneDatosParaActualizar = Object.values(updateTarjetaDto).some(value => value !== null && value !== undefined);
      if (!tieneDatosParaActualizar) throw new InternalServerErrorException('No hay datos para actualizar');

      // Actualizar solo los campos que tengan datos
      Object.keys(updateTarjetaDto).forEach(key => {
        if (updateTarjetaDto[key] !== null && updateTarjetaDto[key] !== undefined) {
          tarjeta[key] = updateTarjetaDto[key];
        }
      });

      // Guardar los cambios
      const tarjetaActualizada = await this.tarjetaRepository.save(tarjeta);
      if (!tarjetaActualizada) throw new InternalServerErrorException('No se pudo actualizar la tarjeta.');

      return tarjetaActualizada;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const tarjeta = await this.tarjetaRepository.findOneBy({ id });
      if (!tarjeta) throw new InternalServerErrorException('No se encontraro tarjeta registrada.');
      const eliminarTarjeta = await this.tarjetaRepository.remove(tarjeta);
      if (!eliminarTarjeta) throw new InternalServerErrorException('No se pudo eliminar la tarjeta.');
      return eliminarTarjeta;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      // buscar la tarjeta por id
      const tarjeta = await this.tarjetaRepository.findOne({ where: { id, deletedAt: null } })

      // si no encuentra nada
      if (!tarjeta) throw new NotFoundException('No se encontro la compra')

      // actualizar el tarjeta
      tarjeta.deletedAt = new Date()

      // guardar la compra
      await this.tarjetaRepository.save(tarjeta)

      // devolver mensaje de exito
      return { message: "compra eliminada correctamente" }
    } catch (error) {
      throw new BadRequestException('Error al eliminar la compra', error.message)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 30); // Fecha límite (30 días atrás)

      const tarjetasEliminar = await this.tarjetaRepository.find({
        where: {
          deletedAt: In([LessThan(fechaLimite)]), // tarjetas con deletedAt anterior al límite
        },
      });

      if (tarjetasEliminar.length > 0) {
        await this.tarjetaRepository.remove(tarjetasEliminar); // Eliminación definitiva
        console.log(`Eliminados ${tarjetasEliminar.length} tarjetas obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar tarjetas obsoletos.', error.message,
      );
    }
  }
}
