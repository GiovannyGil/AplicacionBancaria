import { Module } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { TarjetasController } from './tarjetas.controller';
import { Tarjeta } from './entities/tarjeta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Transaccion } from './entities/transacciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarjeta, Usuario, Transaccion])],
  controllers: [TarjetasController],
  providers: [TarjetasService],
  exports: [TarjetasService, TypeOrmModule]
})
export class TarjetasModule {}
