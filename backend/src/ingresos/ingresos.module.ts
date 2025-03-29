import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso, Usuario])],
  controllers: [IngresosController],
  providers: [IngresosService],
  exports: [IngresosService, TypeOrmModule]
})
export class IngresosModule {}
