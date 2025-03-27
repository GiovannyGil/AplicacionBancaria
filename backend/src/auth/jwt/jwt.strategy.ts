import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'SECRET-KEY',
        });
    }

    async validate(payload: any) {
        // Aquí puedes agregar lógica para validar si el usuario aún existe, etc.
        return { userId: payload.sub, nombreUsuario: payload.nombreUsuario, rol: payload.rol };
    }
}