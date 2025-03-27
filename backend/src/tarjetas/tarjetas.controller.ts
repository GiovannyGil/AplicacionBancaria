import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('tarjetas')
@UseGuards(JwtAuthGuard)
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post()
  create(@Body() createTarjetaDto: CreateTarjetaDto) {
    return this.tarjetasService.create(createTarjetaDto);
  }

  @Get()
  findAll() {
    return this.tarjetasService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.tarjetasService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTarjetaDto: UpdateTarjetaDto) {
    return this.tarjetasService.update(+id, updateTarjetaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.tarjetasService.remove(+id);
  }

  @Post('asignarTarjetaUsuario/:id')
  asignarTarjetaUsuario(@Param('id') id: number, @Body() numero: string) {
    return this.tarjetasService.asignarTarjetaUsuario(+id, numero);
  }

  @Get('tarjetasxUsuario/:id')
  obtenerTarjetasUsuario(@Param('id') id: number) {
    return this.tarjetasService.obtenerTarjetasUsuario(+id);
  }

  @Post('realizarConpra:/:id')
  realizarCompra(@Param('id') id: number, @Body() tarjetaID: number, @Body() monto: number) {
    return this.tarjetasService.realizarCompra(+id, tarjetaID, monto);
  }

  @Post('pagarTarjeta:/:id')
  pagarTarjeta(@Param('id') id: number, @Body() tarjetaID: number, @Body() monto: number) {
    return this.tarjetasService.pagarTarjeta(+id, tarjetaID, monto);
  }

  @Get('obtenerSaldo/:id')
  obtenerSaldo(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.obtenerSaldo(numero, +id);
  }

  @Post('bloquearTarjeta/:id')
  bloquearTarjeta(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.bloquearTarjeta(numero, +id);
  }

  @Post('activarTarjeta/:id')
  activarTarjeta(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.activarTarjeta(numero, +id);
  }

  @Post('solicitarAumentoCupo:/:id')
  solicitarAumentoCupo(@Body() numero: string, @Param('id') id: number,  @Body() cupo: number) {
    return this.tarjetasService.solicitarAumentoCupo(numero, +id, cupo);
  }


}
