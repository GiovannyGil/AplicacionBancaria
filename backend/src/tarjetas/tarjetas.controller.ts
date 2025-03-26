import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('tarjetas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post()
  @Roles('Administrador')
  create(@Body() createTarjetaDto: CreateTarjetaDto) {
    return this.tarjetasService.create(createTarjetaDto);
  }

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.tarjetasService.findAll();
  }

  @Get('id/:id')
  @Roles('Administrador')
  findOne(@Param('id') id: string) {
    return this.tarjetasService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateTarjetaDto: UpdateTarjetaDto) {
    return this.tarjetasService.update(+id, updateTarjetaDto);
  }

  @Delete('delete/:id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.tarjetasService.remove(+id);
  }

  @Post('asignarTarjetaUsuario/:id')
  @Roles('Administrador', 'Usuario')
  asignarTarjetaUsuario(@Param('id') id: number, @Body() numero: string) {
    return this.tarjetasService.asignarTarjetaUsuario(+id, numero);
  }

  @Get('tarjetasxUsuario/:id')
  @Roles('Administrador', 'Usuario')
  obtenerTarjetasUsuario(@Param('id') id: number) {
    return this.tarjetasService.obtenerTarjetasUsuario(+id);
  }

  @Post('realizarConpra:/:id')
  @Roles('Administrador', 'Usuario')
  realizarCompra(@Param('id') id: number, @Body() tarjetaID: number, @Body() monto: number) {
    return this.tarjetasService.realizarCompra(+id, tarjetaID, monto);
  }

  @Post('pagarTarjeta:/:id')
  @Roles('Administrador', 'Usuario')
  pagarTarjeta(@Param('id') id: number, @Body() tarjetaID: number, @Body() monto: number) {
    return this.tarjetasService.pagarTarjeta(+id, tarjetaID, monto);
  }

  @Get('obtenerSaldo/:id')
  @Roles('Administrador', 'Usuario')
  obtenerSaldo(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.obtenerSaldo(numero, +id);
  }

  @Post('bloquearTarjeta/:id')
  @Roles('Administrador', 'Usuario')
  bloquearTarjeta(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.bloquearTarjeta(numero, +id);
  }

  @Post('activarTarjeta/:id')
  @Roles('Administrador', 'Usuario')
  activarTarjeta(@Body() numero: string, @Param('id') id: number) {
    return this.tarjetasService.activarTarjeta(numero, +id);
  }

  @Post('solicitarAumentoCupo:/:id')
  @Roles('Administrador', 'Usuario')
  solicitarAumentoCupo(@Body() numero: string, @Param('id') id: number,  @Body() cupo: number) {
    return this.tarjetasService.solicitarAumentoCupo(numero, +id, cupo);
  }


}
