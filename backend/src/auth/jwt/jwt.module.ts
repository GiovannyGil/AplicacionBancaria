import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// esto por si quiero manejar la autenticacion con middleware
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET-KEY',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    exports: [JwtModule],
})
export class JwtCustomModule { }