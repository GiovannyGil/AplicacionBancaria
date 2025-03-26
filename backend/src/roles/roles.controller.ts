import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard) // comentar esta linea para agregar un rol sin estar obligado a autenticarse
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('Administrador')
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get('id/:id')
  @Roles('Administrador')
  async findOneByID(@Param('id') id: string) {
    return await this.rolesService.findOneByID(+id);
  }

  @Get('nombre/:nombreRol')
  @Roles('Administrador')
  async findOneByNombre(@Param('nombreRol') nombreRol: string) {
    return await this.rolesService.findOneByNombre(nombreRol);
  }

  @Patch('update/:id')
  @Roles('Administrador')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(+id, updateRoleDto);
  }

  @Delete('delete/:id')
  @Roles('Administrador')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.softDelete(id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.rolesService.cleanDeletedRecords();
  }
}
