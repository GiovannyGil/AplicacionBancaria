import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('ahorros')
@UseGuards(JwtAuthGuard)
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

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.ahorrosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAhorroDto: UpdateAhorroDto) {
    return this.ahorrosService.update(+id, updateAhorroDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ahorrosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.ahorrosService.cleanDeletedRecords();
  }

  @Delete('removedefinitive/:id')
  removedefinitive(@Param('id') id: string) {
    return this.ahorrosService.remove(+id);
  }
}
