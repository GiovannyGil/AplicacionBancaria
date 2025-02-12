import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { Credito } from './entities/credito.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CreditosService {
  constructor(
    @InjectRepository(Credito) private creditoRepository: Repository<Credito>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) { }

  async create(createCreditoDto: CreateCreditoDto):Promise<Credito> {
    const { usuarioID } = createCreditoDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: {id: usuarioID, deletedAt: null} })
      if(!usuario) throw new NotFoundException('Usuario no encontrado')

      // crear credito
      const credito = this.creditoRepository.create(createCreditoDto);
      if (!credito) throw new InternalServerErrorException('No se pudo crear el credito.');

      const guardarcredito = await this.creditoRepository.save(credito);
      if (!guardarcredito) throw new InternalServerErrorException('No se pudo guardar el credito.');

      return guardarcredito;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el credito: ${error.message}`);
    }
  }

  async findAll(): Promise<Credito[]> {
    try {
      const creditos = await this.creditoRepository.find({ where: { deletedAt: null }, relations: ['usuario'] });

      if (!creditos) throw new InternalServerErrorException('No se encontraron creditos.');
      return creditos;

    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar los creditos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Credito> {
    try {
      const creditos = await this.creditoRepository.findOne({ where: { id, deletedAt: null }, relations: ['usuario'] });

      if (!creditos) throw new InternalServerErrorException('No se encontró el credito.');

      return creditos;

    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar el credito: ${error.message}`);
    }
  }

  async update(id: number, updateCreditoDto: UpdateCreditoDto): Promise<Credito> {
    try {
      // verificar que el credito existe
      const credito = await this.creditoRepository.findOne({ where: { id, deletedAt: null } });
      if (!credito) throw new NotFoundException('Credito no encontrado');

      // verificar si hay datos a modificar
      const tieneDatosParaActualizar = Object.values(updateCreditoDto).some(value => value !== null && value !== undefined);
      if (!tieneDatosParaActualizar) throw new BadRequestException('No hay datos para actualizar');

      // actualizar el credito que tiene los datos no nulos
      Object.keys(updateCreditoDto).forEach(key => {
        if (updateCreditoDto[key] !== null && updateCreditoDto[key] !== undefined) {
          credito[key] = updateCreditoDto[key];
        }
      })

      // guardar el credito
      const creditoActualizado = await this.creditoRepository.save(credito);
      if (!creditoActualizado) throw new InternalServerErrorException('No se pudo actualizar el credito');

      // devolver el credito actualizado
      return creditoActualizado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el credito: ${error.message}`);      
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      // buscar la credito por id
      const credito = await this.creditoRepository.findOne({ where: { id, deletedAt: null } })

      // si no encuentra nada
      if (!credito) throw new NotFoundException('No se encontro la compra')

      // actualizar el credito
      credito.deletedAt = new Date()

      // guardar la compra
      await this.creditoRepository.save(credito)

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

      const creditosEliminar = await this.creditoRepository.find({
        where: {
          deletedAt: In([LessThan(fechaLimite)]), // creditos con deletedAt anterior al límite
        },
      });

      if (creditosEliminar.length > 0) {
        await this.creditoRepository.remove(creditosEliminar); // Eliminación definitiva
        console.log(`Eliminados ${creditosEliminar.length} creditos obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar creditos obsoletos.', error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      const credito = await this.creditoRepository.findOneBy({ id });
      if (!credito) throw new InternalServerErrorException('No se encontró el credito.');
      const creditoEliminado = await this.creditoRepository.delete({ id: credito.id });
      if (!creditoEliminado) throw new InternalServerErrorException('No se pudo eliminar el credito.');
      return creditoEliminado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el credito: ${error.message}`);
    }
  }
}
