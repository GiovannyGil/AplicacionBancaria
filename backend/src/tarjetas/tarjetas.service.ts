import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Transaccion } from './entities/transacciones.entity';

@Injectable()
export class TarjetasService {

  constructor(
    @InjectRepository(Tarjeta) private tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Transaccion) private transaccionRepository: Repository<Transaccion>,
  ) { }

  async create(createTarjetaDto: CreateTarjetaDto): Promise<Tarjeta> {
    const { usuarioID } = createTarjetaDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: { id: usuarioID, deletedAt: IsNull() } })
      if (!usuario) throw new NotFoundException('Usuario no encontrado')

      // crear Tarjeta
      const tarjeta = this.tarjetaRepository.create({
        ...createTarjetaDto,
        usuario: usuario,
      });
      if (!tarjeta) throw new NotFoundException('No se pudo crear la tarjeta.');

      // guardar Tarjeta
      const guardarTarjeta = await this.tarjetaRepository.save(tarjeta);
      if (!guardarTarjeta) throw new NotFoundException('No se pudo guardar la tarjeta.');

      return guardarTarjeta;
    } catch (error) {
      console.log('error al crear la tarjeta', error);
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async findAll(userId: number): Promise<Tarjeta[]> {
    try {
      const tarjetas = await this.tarjetaRepository.find({ where: { deletedAt: IsNull(), usuario: {id: userId} }, relations: ['usuario'] });
      
      if (!tarjetas) throw new NotFoundException('No se encontraron tarjetas registradas.');
      
      return tarjetas;
    } catch (error) {
      console.log('error al buscar las tarjetas', error);
      throw new InternalServerErrorException(`Error al encontrar las tarjetas: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Tarjeta> {
    try {
      return await this.tarjetaRepository.findOneOrFail({
        where: { id, deletedAt: IsNull() },
        relations: ['usuario']
      });
    } catch (error) {
      console.log('error al buscar la tarjeta', error);
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('No se encontró la tarjeta registrada.');
      }
      throw new InternalServerErrorException(`Error al obtener la tarjeta: ${error?.message || 'Error desconocido'}`);
    }
  }


  async update(id: number, updateTarjetaDto: UpdateTarjetaDto): Promise<Tarjeta> {
    try {
      //verificar que la tarjeta existe
      const tarjeta = await this.findOne(id);
      if (!tarjeta) throw new NotFoundException('No se encontró la tarjeta.');

      // verificar si hay datos a modificar
      if (Object.keys(updateTarjetaDto).length === 0)
        throw new NotFoundException('No hay datos para actualizar');

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
      console.log('error al actualizar la tarjeta', error);
      throw new InternalServerErrorException(`Error al actualizar la tarjeta: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const tarjeta = await this.tarjetaRepository.findOne({ where: { id, deletedAt: IsNull() } });
      if (!tarjeta) throw new NotFoundException('No se encontró la tarjeta registrada.');

      tarjeta.deletedAt = new Date();
      await this.tarjetaRepository.save(tarjeta);

      return { message: 'Tarjeta eliminada correctamente' };
    } catch (error) {
      console.log('error al eliminar la tarjeta', error);
      throw new InternalServerErrorException(`Error al eliminar la tarjeta: ${error.message}`);
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      const tarjeta = await this.tarjetaRepository.findOneOrFail({ where: { id, deletedAt: IsNull() } });

      tarjeta.deletedAt = new Date();
      await this.tarjetaRepository.save(tarjeta);

      return { message: "Tarjeta eliminada correctamente" };
    } catch (error) {
      console.log('error al eliminar la tarjeta', error);
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('No se encontró la tarjeta');
      }
      throw new InternalServerErrorException(`Error al eliminar la tarjeta: ${error?.message || 'Error desconocido'}`);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 30); // Fecha límite (30 días atrás)

      const tarjetasEliminar = await this.tarjetaRepository.find({
        where: { deletedAt: LessThan(fechaLimite) },
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

  // metodo para asignar una tarjeta a un usuario
  async asignarTarjetaUsuario(idUsuario: number, numero: string): Promise<{ mensaje: string, tarjetaId: number, usuarioId: number }> {
    try {
      // Buscar el usuario por id
      const usuario = await this.usuariosRepository.findOne({ where: { id: idUsuario, deletedAt: null } });
      if (!usuario) throw new NotFoundException('No se encontró el usuario');

      // Buscar la tarjeta por número y asegurarse de cargar la relación con usuario
      const tarjeta = await this.tarjetaRepository.findOne({
        where: { numero, deletedAt: null },
        relations: ['usuario'],
      });
      if (!tarjeta) throw new NotFoundException('No se encontró la tarjeta');

      // Verificar que la tarjeta no esté asignada a otro usuario
      if (tarjeta.usuario) throw new BadRequestException('La tarjeta ya está asignada a otro usuario');

      // Asignar la tarjeta al usuario
      tarjeta.usuario = usuario;

      // Guardar los cambios en la base de datos
      await this.tarjetaRepository.save(tarjeta);

      // Retornar mensaje de éxito con información relevante
      return { mensaje: 'Tarjeta asignada correctamente', tarjetaId: tarjeta.id, usuarioId: usuario.id };
    } catch (error) {
      console.log('error al asignar la tarjeta', error);
      throw new InternalServerErrorException(`Error al asignar la tarjeta al usuario: ${error.message}`);
    }
  }


  // metodo para obtener las tarjetas de un usuario
  async obtenerTarjetasUsuario(idUsuario: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuariosRepository.findOne({ where: { id: idUsuario, deletedAt: null } })
      // si no encuentra nada
      if (!usuario) throw new NotFoundException('No se encontro el usuario')

      // buscar las tarjetas del usuario
      const tarjetas = await this.tarjetaRepository.find({ where: { usuario, deletedAt: null } })
      // si no encuentra nada
      if (!tarjetas) throw new NotFoundException('No se encontraron tarjetas para el usuario')

      // devolver las tarjetas
      return tarjetas
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener las tarjetas del usuario: ${error.message}`);
    }
  }

  // metodo para comprar con una tarjeta
  async realizarCompra(usuarioID: number, tarjetaID: number, monto: number): Promise<string> {
    try {
      const tarjeta = await this.tarjetaRepository.findOne({
        where: { id: tarjetaID, deletedAt: null },
        relations: ['usuario']
      });

      if (!tarjeta || tarjeta.usuario.id !== usuarioID) {
        throw new NotFoundException('Tarjeta no encontrada o no pertenece al usuario');
      }

      if ((tarjeta.tipo === 1 && tarjeta.saldoDebito < monto) || (tarjeta.tipo !== 1 && tarjeta.cupoDisponible < monto)) {
        throw new BadRequestException('Fondos insuficientes');
      }

      tarjeta.tipo === 1 ? (tarjeta.saldoDebito -= monto) : (tarjeta.cupoDisponible -= monto);

      await this.tarjetaRepository.save(tarjeta);

      const transaccion = this.transaccionRepository.create({ tarjeta, monto, tipo: 'compra' });
      await this.transaccionRepository.save(transaccion);

      return 'Compra realizada con éxito';
    } catch (error) {
      throw new InternalServerErrorException(`Error al realizar la compra: ${error?.message || 'Error desconocido'}`);
    }
  }


  // metodo para obtener el saldo de una tarjeta
  async obtenerSaldo(numero: string, idUsuario: number) {
    try {
      const tarjeta = await this.tarjetaRepository.findOne({
        where: { numero, deletedAt: null },
        relations: ['usuario']
      });
      if (!tarjeta) throw new NotFoundException('No se encontró la tarjeta');

      if (tarjeta.usuario.id !== idUsuario) {
        throw new BadRequestException('La tarjeta no pertenece al usuario');
      }

      return { saldo: tarjeta.cupoDisponible };
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el saldo de la tarjeta: ${error?.message || 'Error desconocido'}`);
    }
  }


  // metodo para bloquear una tarjeta
  async bloquearTarjeta(numero: string, idUsuario: number) {
    try {
      // buscar la tarjeta por numero
      const tarjeta = await this.tarjetaRepository.findOne({ where: { numero, deletedAt: null } })
      // si no encuentra nada
      if (!tarjeta) throw new NotFoundException('No se encontro la tarjeta')
      // buscar el usuario por id
      const usuario = await this.usuariosRepository.findOne({ where: { id: idUsuario, deletedAt: null } })
      // si no encuentra nada
      if (!usuario) throw new NotFoundException('No se encontro el usuario')

      // verificar que la tarjeta pertenece al usuario
      if (tarjeta.usuario.id !== usuario.id) throw new BadRequestException('La tarjeta no pertenece al usuario')
      
      // actualizar el tarjeta
      tarjeta.estado = false

      // guardar la compra
      await this.tarjetaRepository.save(tarjeta)

      // devolver mensaje de exito
      return { message: "tarjeta bloqueada correctamente" }
    } catch (error) {
      throw new InternalServerErrorException(`Error al bloquear la tarjeta: ${error.message}`);
    }
  }

  // metodo para activar una tarjeta
  async activarTarjeta(numero: string, idUsuario: number) {
    try {
      // buscar la tarjeta por numero
      const tarjeta = await this.tarjetaRepository.findOne({ where: { numero, deletedAt: null } })
      // si no encuentra nada
      if (!tarjeta) throw new NotFoundException('No se encontro la tarjeta')
      // buscar el usuario por id
      const usuario = await this.usuariosRepository.findOne({ where: { id: idUsuario, deletedAt: null } })
      // si no encuentra nada
      if (!usuario) throw new NotFoundException('No se encontro el usuario')
  
      // verificar que la tarjeta pertenece al usuario
      if (tarjeta.usuario.id !== usuario.id) throw new BadRequestException('La tarjeta no pertenece al usuario')
  
      // actualizar el tarjeta
      tarjeta.estado = true
  
      // guardar la compra
      await this.tarjetaRepository.save(tarjeta)
  
      // devolver mensaje de exito
      return { message: "tarjeta bloqueada correctamente" }
    } catch (error) {
      throw new InternalServerErrorException(`Error al bloquear la tarjeta: ${error.message}`);
    }
  }

  // metodo para solicitar aumento de cupo de una tarjeta
  async solicitarAumentoCupo(numero: string, idUsuario: number, cupo: number) {
    try {
      // buscar la tarjeta por numero
      const tarjeta = await this.tarjetaRepository.findOne({ where: { numero, deletedAt: null } })
      // si no encuentra nada
      if (!tarjeta) throw new NotFoundException('No se encontro la tarjeta')
      // buscar el usuario por id
      const usuario = await this.usuariosRepository.findOne({ where: { id: idUsuario, deletedAt: null } })
      // si no encuentra nada
      if (!usuario) throw new NotFoundException('No se encontro el usuario')

      // verificar que la tarjeta pertenece al usuario
      if (tarjeta.usuario.id !== usuario.id) throw new BadRequestException('La tarjeta no pertenece al usuario')

      // actualizar el tarjeta
      tarjeta.cupoTotal = cupo

      // guardar la compra
      await this.tarjetaRepository.save(tarjeta)

      // devolver mensaje de exito
      return { message: "aumento de cupo solicitado correctamente" }
    } catch (error) {
      throw new InternalServerErrorException(`Error al solicitar aumento de cupo: ${error.message}`);
    }
  }

  // metodo para pagar una tarjeta
  async pagarTarjeta(usuarioID: number, tarjetaID: number, monto: number): Promise<string> {
    try {
      const tarjeta = await this.tarjetaRepository.findOne({ where: { id: tarjetaID, usuario: { id: usuarioID } } });
  
      if (!tarjeta || tarjeta.tipo !== 2) throw new NotFoundException('Tarjeta de crédito no encontrada');
  
      if ((tarjeta.cupoTotal - tarjeta.cupoDisponible) < monto) throw new BadRequestException('El monto excede la deuda');
  
      tarjeta.cupoDisponible += monto;
  
      await this.tarjetaRepository.save(tarjeta);
  
      const transaccion = this.transaccionRepository.create({ tarjeta, monto, tipo: 'pago' });
      await this.transaccionRepository.save(transaccion);
  
      return 'Pago realizado con éxito';
    } catch (error) {
      throw new InternalServerErrorException(`Error al realizar el pago: ${error.message}`);  
    }
  }

}
