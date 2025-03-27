import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body('nombreUsuario') nombreUsuario: string, @Body('clave') clave: string) {
    return this.authService.login(nombreUsuario, clave);
  }


  @Post('logout')
  logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del header
    if (!token) throw new UnauthorizedException('Token no proporcionado')
    this.authService.logout(token);
    return { message: 'Logout exitoso' };
  }
}
