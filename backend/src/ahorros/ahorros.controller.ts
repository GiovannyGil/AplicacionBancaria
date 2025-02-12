import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Post()
  create(@Body() createAhorroDto: CreateAhorroDto) {
    return this.ahorrosService.create(createAhorroDto);
  }

  @Get()
  findAll() {
    return this.ahorrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ahorrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAhorroDto: UpdateAhorroDto) {
    return this.ahorrosService.update(+id, updateAhorroDto);
  }

  @Delete(':id')
  // @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.ahorrosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.ahorrosService.cleanDeletedRecords();
  }

  @Delete(':id')
  removedefinitive(@Param('id') id: string) {
    return this.ahorrosService.remove(+id);
  }
}
