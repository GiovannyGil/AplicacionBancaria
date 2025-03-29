import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Credito } from 'src/creditos/entities/credito.entity';
import { Ahorro } from 'src/ahorros/entities/ahorro.entity';
import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Tarjeta } from 'src/tarjetas/entities/tarjeta.entity';
import { Ingreso } from 'src/ingresos/entities/ingreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role, Credito, Ahorro, Gasto, Tarjeta, Ingreso])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, TypeOrmModule]
})
export class UsuariosModule {}
