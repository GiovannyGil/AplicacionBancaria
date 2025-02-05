import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnexionDDBB from './DataBase/conexion';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnexionDDBB), // <- conexión a la base de datos
    ScheduleModule.forRoot(), AuthModule, // <- para la programación de tareas automaticas

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
