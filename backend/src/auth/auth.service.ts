import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    private invalidatedTokens: Set<string> = new Set(); // Lista negra de tokens

    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    // método para iniciar sesión
    async login(nombreUsuario: string, clave: string): Promise<{ access_token: string }> {
        try {
            console.log('Intentando iniciar sesión con:', nombreUsuario);

            // Buscar usuario
            const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (!usuario) {
                console.log(`Usuario ${nombreUsuario} no encontrado`);
                throw new NotFoundException(`El usuario con NombreUsuario "${nombreUsuario}" no existe o ya fue eliminado.`);
            }

            console.log('Usuario encontrado:', usuario);

            // Verificar contraseña
            const isPasswordValid = await bcrypt.compare(clave, usuario.clave);
            if (!isPasswordValid) {
                console.log('Clave incorrecta');
                throw new UnauthorizedException('Clave inválida');
            }

            console.log('Clave correcta');

            // Cargar el rol
            const rol = usuario.rol?.nombreRol || 'Sin rol';

            // Crear payload del JWT
            const payload = {
                sub: usuario.id,
                nombreUsuario: usuario.nombreUsuario,
                rol: rol
            };

            console.log('Payload para el token:', payload);

            // Generar el token
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'SECRET-KEY',
                expiresIn: '1h'
            });

            console.log('Token generado correctamente');

            return { access_token: token };
        } catch (error) {
            console.error('Error en login:', error.message);
            throw new UnauthorizedException('Credenciales inválidas', error.message);
        }
    }


    // Método para invalidar un token
    logout(token: string): void {
        try {
            this.invalidatedTokens.add(token); // Agregar el token a la lista negra
        } catch (error) {
            throw new UnauthorizedException('No se pudo invalidar el token 1', error.message);
        }
    }

    // Validar si el token está en la lista negra
    invalidateToken(token: string) {
        try {
            this.invalidatedTokens.add(token);
        } catch (error) {
            throw new UnauthorizedException('No se pudo invalidar el token 2', error.message);
        }
    }

    isTokenInvalidated(token: string): boolean {
        try {
            return this.invalidatedTokens.has(token);
        } catch (error) {
            throw new UnauthorizedException('No se pudo validar el token 3', error.message);
        }
    }
}
