import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnexionDDBB from './DataBase/conexion';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CreditosModule } from './creditos/creditos.module';
import { AhorrosModule } from './ahorros/ahorros.module';
import { GastosModule } from './gastos/gastos.module';
import { DashModule } from './dash/dash.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnexionDDBB), // <- conexión a la base de datos
    ScheduleModule.forRoot(), AuthModule, UsuariosModule, CreditosModule, AhorrosModule, GastosModule, DashModule, TarjetasModule, // <- para la programación de tareas automaticas

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
