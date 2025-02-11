import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    async login(nombreUsuario: string, correo: string, clave: string): Promise<{ access_token: string }> {
        try {
            const usuario = await this.usuariosService.findOneByNombre(nombreUsuario);
            const usuarioCorreo = await this.usuariosService.findOneByCorreo(correo);
            if (!usuario || !usuarioCorreo) throw new UnauthorizedException('Usuario Inválido')

            const claveValida = await bcrypt.compare(clave, usuario.clave || usuarioCorreo.clave);
            if (!claveValida) throw new UnauthorizedException('Clave inválida')

            // Asegúrate de cargar el rol
              await usuario.rol || usuarioCorreo.rol;

            const payload = {
                sub: usuario.id || usuarioCorreo.id,
                nombreUsuario: usuario.nombreUsuario || usuarioCorreo.nombreUsuario,
                rol: usuario.rol?.nombreRol || usuarioCorreo.rol?.nombreRol || 'Sin rol'
            };

            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'SECRET-KEY',
                expiresIn: '1h'
            });

            return { access_token: token };
        } catch (error) {
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
