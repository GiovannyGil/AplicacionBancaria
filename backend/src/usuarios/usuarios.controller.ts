import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @Roles('Administrador', 'Usuario')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles('Administrador', 'Usuario')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOneByID(+id);
  }

  @Get(':primerNombre')
  @Roles('Administrador', 'Usuario')
  findOneName(@Param('primerNombre') primerNombre: string) {
    return this.usuariosService.findOneByNombre(primerNombre);
  }

  @Get(':correo')
  @Roles('Administrador', 'Usuario')
  findOneEmail(@Param('correo') correo: string) {
    return this.usuariosService.findOneByCorreo(correo);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles('Administrador', 'Usuario')
  remove(@Param('id') id: string) {
    return this.usuariosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.usuariosService.cleanDeletedRecords();
  }
}
