import { Module } from '@nestjs/common';
import { DashService } from './dash.service';
import { DashController } from './dash.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { TarjetasModule } from 'src/tarjetas/tarjetas.module';
import { RolesModule } from 'src/roles/roles.module';
import { GastosModule } from 'src/gastos/gastos.module';
import { CreditosModule } from 'src/creditos/creditos.module';
import { AhorrosModule } from 'src/ahorros/ahorros.module';

@Module({
  imports: [UsuariosModule, TarjetasModule, RolesModule, GastosModule, CreditosModule, AhorrosModule],
  controllers: [DashController],
  providers: [DashService],
})
export class DashModule { }
