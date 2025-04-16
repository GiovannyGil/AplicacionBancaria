import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('creditos')
@UseGuards(JwtAuthGuard)
export class CreditosController {
  constructor(private readonly creditosService: CreditosService) {}

  @Post()
  create(@Body() createCreditoDto: CreateCreditoDto) {
    return this.creditosService.create(createCreditoDto);
  }

  @Get()
  findAll(@Req() req: Request & { user: any }) {
    const userId = req.user.id;
    return this.creditosService.findAll(userId);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.creditosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCreditoDto: UpdateCreditoDto) {
    return this.creditosService.update(+id, updateCreditoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.creditosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.creditosService.cleanDeletedRecords();
  }

  @Delete('removedefinitive/:id')
  removedefinitive(@Param('id') id: string) {
    return this.creditosService.remove(+id);
  }
}
