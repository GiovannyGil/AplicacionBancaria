import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body('nombreUsuario') nombreUsuario: string, @Body('clave') clave: string) {
    return this.authService.login(nombreUsuario, clave);
  }

  @Post('register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.register(createUsuarioDto);
  }

  @Post('reestablecerClave')
  async reestablecerClave(
    @Body('nombreUsuario') nombreUsuario: string,
    @Body('correo') correo: string,
    @Body('clave') clave: string,
    @Body('confirmarClave') confirmarClave: string,
  ) {
    return this.authService.reestablecerClave(nombreUsuario, correo, clave, confirmarClave);
  }

  @Post('recuperarUsuario')
  async recuperarUsuario(@Body('correo') correo: string) {
    return this.authService.recordarUsuario(correo);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del header
    if (!token) throw new UnauthorizedException('Token no proporcionado')
    this.authService.logout(token);
    return { message: 'Logout exitoso' };
  }
}
