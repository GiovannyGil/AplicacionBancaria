import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

// esto por si quiero manejar la autenticacion con middleware
@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No autorizado: Token no proporcionado');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET || 'SECRET-KEY',
            }); // usa verifyAsync
            req['user'] = payload;
            next();
        } catch (error) {
            console.error('Error verificando token:', error.message);
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}
