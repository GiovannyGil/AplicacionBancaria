import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    private invalidatedTokens: Set<string> = new Set(); // Lista negra de tokens

    constructor(
        private readonly usuariosService: UsuariosService,
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    // método para iniciar sesión
    async login(nombreUsuario: string, clave: string): Promise<{ access_token: string }> {
        try {
            console.log('Intentando iniciar sesión con:', nombreUsuario);

            // Buscar usuario
            const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (!usuario) {
                console.log(`Usuario ${nombreUsuario} no encontrado`);
                throw new NotFoundException(`El usuario con NombreUsuario "${nombreUsuario}" no existe o ya fue eliminado.`);
            }

            console.log('Usuario encontrado:', usuario);

            // Verificar contraseña
            const isPasswordValid = await bcrypt.compare(clave, usuario.clave);
            if (!isPasswordValid) {
                console.log('Clave incorrecta');
                throw new UnauthorizedException('Clave inválida');
            }

            console.log('Clave correcta');

            // Cargar el rol
            const rol = usuario.rol?.nombreRol || 'Sin rol';

            // Crear payload del JWT
            const payload = {
                sub: usuario.id,
                nombreUsuario: usuario.nombreUsuario,
                rol: rol
            };

            console.log('Payload para el token:', payload);

            // Generar el token
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'SECRET-KEY',
                expiresIn: '1h'
            });

            console.log('Token generado correctamente');

            return { access_token: token };
        } catch (error) {
            console.error('Error en login:', error.message);
            throw new UnauthorizedException('Credenciales inválidas', error.message);
        }
    }

    // Método para registrarse como nuevo usuario
    async register(primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string, nombreUsuario: string, correo: string, clave: string, direccion: string, celular: string, estado: boolean, genero: string, fechaCreacion: Date, rolId: number): Promise<any> {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (existingUser) { throw new UnauthorizedException('El usuario ya existe'); }

            // verificar si los datos son válidos
            const datos = [
                { nombre: 'primerNombre', valor: primerNombre },
                { nombre: 'segundoNombre', valor: segundoNombre },
                { nombre: 'primerApellido', valor: primerApellido },
                { nombre: 'segundoApellido', valor: segundoApellido },
                { nombre: 'nombreUsuario', valor: nombreUsuario },
                { nombre: 'correo', valor: correo },
                { nombre: 'clave', valor: clave },
                { nombre: 'direccion', valor: direccion },
                { nombre: 'celular', valor: celular },
                { nombre: 'estado', valor: estado },
                { nombre: 'genero', valor: genero },
                { nombre: 'fechaCreacion', valor: fechaCreacion },
                { nombre: 'rolId', valor: rolId }
            ]

            for (const dato of datos) {
                if (!dato.valor) {
                    throw new UnauthorizedException(`El campo ${dato.nombre} es obligatorio`);
                }
            }
            // Verificar si el correo ya existe
            const existingEmail = await this.usuariosService.findOneByCorreo(correo);
            if (existingEmail) {
                throw new UnauthorizedException('El correo ya está registrado');
            }

            // Verificar si el nombre de usuario ya existe
            const existingUsername = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (existingUsername) {
                throw new UnauthorizedException('El nombre de usuario ya está registrado');
            }

            // Verificar si el celular ya existe
            const existingCellphone = await this.usuarioRepository.findOne({ where: { celular, deletedAt: null } });
            if (existingCellphone) {
                throw new UnauthorizedException('El celular ya está registrado');
            }

            // Crear nuevo usuario
            const newUser = await this.usuariosService.create({
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                nombreUsuario,
                correo,
                clave: await bcrypt.hash(clave, 10), // Hashear la contraseña
                direccion,
                celular,
                estado,
                genero,
                fechaCreacion,
                rolId: 0 // Asignar rol por defecto (puedes cambiar esto según tu lógica)
            });

            // verificar si el usuario fue creado correctamente
            if (!newUser) {
                throw new UnauthorizedException('Error al crear el usuario');
            }

            // Enviar correo de bienvenida (opcional)
            // await this.sendWelcomeEmail(newUser.correo, newUser.nombreUsuario);
            return newUser;
        } catch (error) {
            console.error('Error en registro:', error.message);
            throw new UnauthorizedException('Error al registrarse', error.message);
        }
    }


    // Método para invalidar un token
    logout(token: string): void {
        try {
            this.invalidatedTokens.add(token); // Agregar el token a la lista negra
        } catch (error) {
            throw new UnauthorizedException('No se pudo invalidar el token 1', error.message);
        }
    }

    // Validar si el token está en la lista negra
    async invalidateToken(token: string) {
        try {
            await this.invalidatedTokens.add(token);
        } catch (error) {
            throw new UnauthorizedException('No se pudo invalidar el token 2', error.message);
        }
    }

    isTokenInvalidated(token: string): boolean {
        try {
            return this.invalidatedTokens.has(token);
        } catch (error) {
            throw new UnauthorizedException('No se pudo validar el token 3', error.message);
        }
    }
}
