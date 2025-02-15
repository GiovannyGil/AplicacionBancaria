import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/auth/guards/roles.guard';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const DynamicRoles = async (rolesService: any) => {
    const roles = await rolesService.findAll(); // Método para obtener todos los roles desde la base de datos
    const roleNames = roles.map((role) => role.nombreRol); // Extrae los nombres de los roles
    return SetMetadata('roles', roleNames);
};