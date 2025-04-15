import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOneByID(+id);
  }

  @Get('nombre/:primerNombre')
  findOneName(@Param('primerNombre') primerNombre: string) {
    return this.usuariosService.findOneByNombre(primerNombre);
  }

  @Get('nombreUsuario/:nombreUsuario')
  findOneNameUser(@Param('nombreUsuario') nombreUsuario: string) {
    return this.usuariosService.findOneByNombre(nombreUsuario);
  }

  @Get('correo/:correo')
  findOneEmail(@Param('correo') correo: string) {
    return this.usuariosService.findOneByCorreo(correo);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usuariosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.usuariosService.cleanDeletedRecords();
  }
}
