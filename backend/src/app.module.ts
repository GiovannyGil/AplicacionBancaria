import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CreditosModule } from './creditos/creditos.module';
import { AhorrosModule } from './ahorros/ahorros.module';
import { GastosModule } from './gastos/gastos.module';
import { DashModule } from './dash/dash.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { APP_GUARD } from '@nestjs/core';
import ConnexionDDBB from './DataBase/conexion';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './common/middleware/jwt.middleware';
import { JwtCustomModule } from './auth/jwt/jwt.module';

@Module({
  imports: [
    //! esto por si quiero manejar la autenticacion con middleware

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'SECRET_KEY',
    //   signOptions: { expiresIn: '1h' }, // Configura el tiempo de expiración
    // }),
    // JwtCustomModule,

    TypeOrmModule.forRoot(ConnexionDDBB), // <- conexión a la base de datos
    ScheduleModule.forRoot(), AuthModule, RolesModule, UsuariosModule, CreditosModule, AhorrosModule, GastosModule, DashModule, TarjetasModule, // <- para la programación de tareas automaticas

  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  //! esto por si quiero manejar la autenticacion con middleware
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtMiddleware)
  //     .exclude(
  //       { path: 'auth/login', method: RequestMethod.POST },
  //       { path: 'auth/logout', method: RequestMethod.POST },
  //     )
  //     .forRoutes('*'); // Aplica a todas las rutas
  // }
}
