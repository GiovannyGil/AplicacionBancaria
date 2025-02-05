import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthService } from '../auth.service';

interface JwtPayload {
    sub: number;
    nombreUsuario: string;
    rol?: string;
  }

  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      private readonly usuariosService: UsuariosService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
        passReqToCallback: true // Importante para obtener el token completo
      });
    }
  
    async validate(payload: { 
        sub: number, 
        nombreUsuario: string, 
        rol?: string 
      }) {
        try {
          const usuario = await this.usuariosService.findOneByID(payload.sub);
          
          if (!usuario) {
            throw new UnauthorizedException('Usuario no encontrado')
          }
      
          return {
            id: usuario.id,
            nombreUsuario: usuario.NombreUsuario,
            rol: usuario.rol?.nombreRol || 'Sin rol'
          };
        } catch (error) {
          throw new UnauthorizedException('No autorizado')
        }
    }
  }