import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>
) {}

  // metodo para verificar si ya exitse le rol a crear
  async verifyExistROL(nombreRol: string): Promise<Boolean> {
    try {
      // buscar el rol
      return !!(await this.roleRepository.findOne({ where: { nombreRol, deletedAt: null } }));
    } catch (error) {
      throw new InternalServerErrorException('Error al verificar la existencia del ROL', error.message)
    }
  }

  // metodo para crear un rol
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const { nombreRol, estado, descripcion } = createRoleDto;

      // verificar si el rol ya existe
      const RolExiste = await this.verifyExistROL(createRoleDto.nombreRol)
      if(RolExiste) throw new BadRequestException('El rol ya existe')

      // crear el rol
      const nuevoRol = this.roleRepository.create({ nombreRol, estado, descripcion });
      if(!nuevoRol) throw new BadRequestException('Error al crear el ROL')
      return await this.roleRepository.save(nuevoRol);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el ROL', error.message)
    }
  }

  // metodo para buscar todos los roles
  async findAll(): Promise<Role[]> {
    try {
      // buscar los roles
      const roles = await this.roleRepository.find({ where: { deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if(!roles || roles.length === 0) throw new BadRequestException('No hay roles registrados')

      return roles
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar los roles', error.message)
    }
  }

  // metodo para buscr un rol por id
  async findOneByID(id: number): Promise<Role> {
    try {
      // buscar el rol
      const rol = await this.roleRepository.findOne({ where: { id, deletedAt: null }})
      // si no encuentra el rol devolver un null
      if(!rol) throw new BadRequestException('El rol no existe')
      // retornar el rol
      return rol
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el rol', error.message)
    }
  }

  // metodo para buscar un rol por nombre
  async findOneByNombre(nombreRol: string): Promise<Role> {
    try {
      // buscar el rol
      const rol = await this.roleRepository.findOne({ where: { nombreRol, deletedAt: null } })
      // si no encuentra el rol devolver un null
      if (!rol) throw new BadRequestException('El rol no existe')
      // retornar el rol
      return rol
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el rol', error.message)
    }
  }

  // metodo para actualizar
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const { nombreRol, estado, descripcion } = updateRoleDto;

    const role = await this.findOneByID(id);

    if (nombreRol && role.nombreRol !== nombreRol && (await this.verifyExistROL(nombreRol))) {
      throw new BadRequestException('El nombre del rol ya está en uso');
    }

    Object.assign(role, { nombreRol, estado, descripcion });
    return await this.roleRepository.save(role);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el rol', error.message)
    }
  }

  // mepara marcar un rol como eliminado -> deletedAt -> Tiempo/Fecha
  async softDelete(id: number): Promise<string> {
    try {
      const role = await this.findOneByID(id);
      await this.roleRepository.softRemove(role);
      return `El rol con ID ${id} ha sido eliminado (soft delete)`;
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el ROL', error.message)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const roleParaEliminar = await this.roleRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // role con deletedAt anterior al límite
        },
      });

      if (roleParaEliminar.length > 0) {
        await this.roleRepository.remove(roleParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${roleParaEliminar.length} role obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar role obsoletas.', error.message,
      );
    }
  }
}
