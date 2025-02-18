import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { Gasto } from './entities/gasto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto, Usuario])],
  controllers: [GastosController],
  providers: [GastosService],
  exports: [GastosService, TypeOrmModule]
})
export class GastosModule {}
