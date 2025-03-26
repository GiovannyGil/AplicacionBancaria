import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  @Roles('Administrador', 'Usuario')
  create(@Body() createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Get()
  @Roles('Administrador', 'Usuario')
  findAll() {
    return this.gastosService.findAll();
  }

  @Get('id/:id')
  @Roles('Administrador', 'Usuario')
  findOne(@Param('id') id: string) {
    return this.gastosService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles('Administrador', 'Usuario')
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(+id, updateGastoDto);
  }

  @Delete('delete/:id')
  @Roles('Administrador', 'Usuario')
  remove(@Param('id') id: string) {
    return this.gastosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.gastosService.cleanDeletedRecords();
  }

  @Delete('removedefinitive/:id')
  @Roles('Administrador', 'Usuario')
  removedefinitive(@Param('id') id: string) {
    return this.gastosService.remove(+id);
  }
}
