import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';

@Controller('creditos')
export class CreditosController {
  constructor(private readonly creditosService: CreditosService) {}

  @Post()
  @Roles('Administrador', 'Usuario')
  create(@Body() createCreditoDto: CreateCreditoDto) {
    return this.creditosService.create(createCreditoDto);
  }

  @Get()
  @Roles('Administrador', 'Usuario')
  findAll() {
    return this.creditosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario')
  findOne(@Param('id') id: string) {
    return this.creditosService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario')
  update(@Param('id') id: string, @Body() updateCreditoDto: UpdateCreditoDto) {
    return this.creditosService.update(+id, updateCreditoDto);
  }

  @Delete(':id')
  @Roles('Administrador', 'Usuario')
  remove(@Param('id') id: string) {
    return this.creditosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.creditosService.cleanDeletedRecords();
  }

  @Delete(':id')
  @Roles('Administrador', 'Usuario')
  removedefinitive(@Param('id') id: string) {
    return this.creditosService.remove(+id);
  }
}
