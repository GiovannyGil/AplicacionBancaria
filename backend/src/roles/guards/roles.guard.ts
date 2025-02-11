import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// Constante que define el metadata personalizado
export const ROLES_KEY = 'roles';

// Injectable del guard
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        try {
            // Obtener los roles requeridos del decorador
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            console.log('Roles requeridos:', requiredRoles);

            // Si no se especifican roles, permitir acceso
            if (!requiredRoles) {
                return true;
            }

            // Obtener el usuario de la solicitud
            const { user } = context.switchToHttp().getRequest();

            console.log('Usuario en la solicitud:', user);

            // Verificar si el usuario está autenticado
            if (!user) {
                throw new UnauthorizedException('Usuario no autenticado');
            }

            // Verificar si el rol del usuario está en los roles requeridos
            const hasRequiredRole = requiredRoles.some(
                (role) => user.rol?.toLowerCase() === role.toLowerCase()
            );

            if (!hasRequiredRole) {
                throw new ForbiddenException('No tienes permisos suficientes');
            }

            return true;
        } catch (error) {
            throw new UnauthorizedException('No autorizado');
        }
    }
}