import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreditosController } from './creditos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credito } from './entities/credito.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credito, Usuario])],
  controllers: [CreditosController],
  providers: [CreditosService],
  exports: [CreditosService, TypeOrmModule]
})
export class CreditosModule {}
