import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    try {
      console.log('JWT Guard - User:', user);
      console.log('JWT Guard - Error:', err);
      console.log('JWT Guard - Info:', info);

      if (err) {
        throw err || new UnauthorizedException('Error de autenticación');
      }
      if (!user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Error de autenticación');
    }
  }
}