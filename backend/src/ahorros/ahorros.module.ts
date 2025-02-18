import { Module } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { AhorrosController } from './ahorros.controller';
import { Ahorro } from './entities/ahorro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ahorro, Usuario])],
  controllers: [AhorrosController],
  providers: [AhorrosService],
  exports: [AhorrosService, TypeOrmModule]
})
export class AhorrosModule {}
