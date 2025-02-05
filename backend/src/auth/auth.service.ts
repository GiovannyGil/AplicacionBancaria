import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    private invalidatedTokens: Set<string> = new Set(); // Lista negra de tokens

    constructor(
        // private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }
}
