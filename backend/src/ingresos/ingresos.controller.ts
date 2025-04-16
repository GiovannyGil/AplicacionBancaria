import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('ingresos')
@UseGuards(JwtAuthGuard)
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) { }

  @Post()
  create(@Body() createIngresoDto: CreateIngresoDto) {
    return this.ingresosService.create(createIngresoDto);
  }

  @Get()
  findAll(@Req() req: Request & { user: any }) {
    const userId = req.user.id;
    return this.ingresosService.findAll(userId);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.ingresosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateIngresoDto: UpdateIngresoDto) {
    return this.ingresosService.update(+id, updateIngresoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ingresosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.ingresosService.cleanDeletedRecords();
  }

  @Delete('removedefinitive/:id')
  removedefinitive(@Param('id') id: string) {
    return this.ingresosService.remove(+id);
  }
}
