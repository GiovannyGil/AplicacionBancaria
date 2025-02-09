import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { In, LessThan, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdatePasswordDto } from './dto/Update-password.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // metodo para crear un usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      // obtener los datos del usuario -> payload
      const {clave, ...usuarioData} = createUsuarioDto

      // verificar que no esten vacios
      if(usuarioData === null || !usuarioData){ throw new NotFoundException(`algo sucedio, no se encontraron los datos del usuario`) }

      // encriptar la contraseña
      const saltos = await bcrypt.genSalt(10)
      const encriptadoClave = await bcrypt.hash(clave, saltos)

      //crear el usuario
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        clave: encriptadoClave
      })

      // controlar si el usuario no se creo
      if (!usuario) { throw new NotFoundException(`algo sucedio , no se pudo crear el usuario`) }

      // guardar el usuario
      return await this.usuarioRepository.save(usuario)

    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el usuario: ${error.message}`);
    }
  }

  // metodo para buscar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    try {
      // buscar los usuarios
      const usuarios = await this.usuarioRepository.find({ where: {deletedAt: null} })
      // si no encuentra nada, devolver un array vacio
      if (!usuarios) throw new NotFoundException('No se encontraron usuarios registrados.')
      return usuarios
    } catch (error) {
      throw new InternalServerErrorException(`Error al encontrar los usuarios ${error.message}`)
    }
  }

  // metodo para buscar un usuario por id
  async findOneByID(id: number): Promise<Usuario> {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({ where: { id, deletedAt: null }})
      // controlar si no se encuentra el usuario
      if (!usuario) throw new NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`)
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new InternalServerErrorException(`Error al encontrar el usuario ${error.message}`)
    }
  }

  // meotodo para buscar un usuario por NombreUsuario
  async findOneByNombre(primerNombre: string): Promise<Usuario | null> {
    try {
      // buscr el usuario por nombreUsuario
      const usuario = await this.usuarioRepository.findOne({ where: { primerNombre: primerNombre, deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if (!usuario) throw new NotFoundException(`El usuario con NombreUsuario ${primerNombre} no existe o ya fue eliminado.`)
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new InternalServerErrorException(`Error al encontrar el usuario ${error.message}`)
    }
  }

  // metodo para buscar un usuario por email
  async findOneByCorreo(correo: string): Promise<Usuario> {
    try {
      // buscr el usuario por correo
      const usuario = await this.usuarioRepository.findOne({ where: { correo: correo, deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if (!usuario) throw new NotFoundException(`El usuario con correo ${correo} no existe o ya fue eliminado.`)
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new InternalServerErrorException(`Error al encontrar el usuario ${error.message}`)
    }
  }

  // metodo para actualizar la contraseña de un usuario
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    try {
      const { clave, nuevaClave } = updatePasswordDto

      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: null },
      });

      // verificar si el usuario existe
      if (!usuario) throw new NotFoundException('El usuario no existe o ya fue eliminado')

      // verificar si la contraseña actual es correcta
      const claveValida = await bcrypt.compare(clave, usuario.clave);
      if (!claveValida) { throw new BadRequestException('La contraseña actual no es correcta') }

      // encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      usuario.clave = await bcrypt.hash(nuevaClave, salt);

      // guardar los cambios
      await this.usuarioRepository.save(usuario);

      return "Contraseña actualizada correctamente";
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar la contraseña del usuario: ${error.message}`);
    }
  }

  // metodo para actualizar un usuario
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const { ...usuarioData } = updateUsuarioDto;

      // Buscar al usuario existente
      const usuario = await this.usuarioRepository.findOne({ where: { id, deletedAt: null } });

      if (!usuario) throw new NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`)

      // Actualizar los datos del usuario
      Object.assign(usuario, usuarioData);

      // Guardar los cambios en la base de datos
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  // metodo para eliminar un usuario
  async softDelete(id: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: null },
      });

      // verificar si el usuario existe
      if (!usuario) throw new NotFoundException('El usuario no existe o ya fue eliminado')

      // marcar el usuario como eliminado
      usuario.deletedAt = new Date();

      // guardar los cambios
      await this.usuarioRepository.save(usuario);

      return "Usuario eliminado Correctamente";
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el usuario ${error.message}`);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const usuariosParaEliminar = await this.usuarioRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // usuarios con deletedAt anterior al límite
        },
      });

      if (usuariosParaEliminar.length > 0) {
        await this.usuarioRepository.remove(usuariosParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${usuariosParaEliminar.length} usuarios obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar usuarios obsoletas.',
      );
    }
  }
}
