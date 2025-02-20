import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('ahorros')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Post()
  @Roles('Administrador', 'Usuario')
  create(@Body() createAhorroDto: CreateAhorroDto) {
    return this.ahorrosService.create(createAhorroDto);
  }

  @Get()
  @Roles('Administrador', 'Usuario')
  findAll() {
    return this.ahorrosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario')
  findOne(@Param('id') id: string) {
    return this.ahorrosService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario')
  update(@Param('id') id: string, @Body() updateAhorroDto: UpdateAhorroDto) {
    return this.ahorrosService.update(+id, updateAhorroDto);
  }

  @Delete(':id')
  @Roles('Administrador', 'Usuario')
  remove(@Param('id') id: string) {
    return this.ahorrosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.ahorrosService.cleanDeletedRecords();
  }

  @Delete(':id')
  @Roles('Administrador', 'Usuario')
  removedefinitive(@Param('id') id: string) {
    return this.ahorrosService.remove(+id);
  }
}
