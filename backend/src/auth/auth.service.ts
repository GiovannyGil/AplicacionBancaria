import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    private invalidatedTokens: Set<string> = new Set(); // Lista negra de tokens

    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly roleService: RolesService,
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    // método para iniciar sesión
    async login(nombreUsuario: string, clave: string): Promise<{ token: string }> {
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

            return { token: token };
        } catch (error) {
            console.error('Error en login:', error.message);
            throw new UnauthorizedException('Credenciales inválidas', error.message);
        }
    }

    // Método para registrarse como nuevo usuario
    async register(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        try {
            // obtener los datos del usuario -> payload
            const { rolId, clave, ...usuarioData } = createUsuarioDto

            // Buscar el rol y verificar si existe
            const rol = await this.roleService.findOneByID(rolId);

            // Si no existe el rol, lanzar una excepción de tipo BadRequestException
            if (!rol) throw new NotFoundException(`El rol con ID ${rolId} no existe`)

            // verificar que no esten vacios
            if (usuarioData === null || !usuarioData) { throw new NotFoundException(`algo sucedio, no se encontraron los datos del usuario`) }
            
            // Verificar si el correo ya existe
            const existingEmail = await this.usuariosService.findOneByCorreo(usuarioData.correo);
            if (existingEmail) {
                throw new UnauthorizedException('El correo ya está registrado');
            }

            // Verificar si el nombre de usuario ya existe
            const existingUsername = await this.usuariosService.findOneByNombreUsuario(usuarioData.nombreUsuario);
            if (existingUsername) {
                throw new UnauthorizedException('El nombre de usuario ya está registrado');
            }

            // Verificar si el celular ya existe
            const existingCellphone = await this.usuarioRepository.findOne({ where: { celular: usuarioData.celular, deletedAt: null } });
            if (existingCellphone) {
                throw new UnauthorizedException('El celular ya está registrado');
            }

            // encriptar la contraseña
            const saltos = await bcrypt.genSalt(10)
            const encriptadoClave = await bcrypt.hash(clave, saltos)

            //crear el usuario
            const usuario = this.usuarioRepository.create({
                ...usuarioData,
                clave: encriptadoClave,
                rol
            })

            // verificar si el usuario fue creado correctamente
            if (!usuario) { throw new UnauthorizedException('Error al crear el usuario'); }

            // Enviar correo de bienvenida (opcional)
            // await this.sendWelcomeEmail(newUser.correo, newUser.nombreUsuario);
            return usuario;
        } catch (error) {
            console.error('Error en registro:', error.message);
            throw new UnauthorizedException('Error al registrarse', error.message);
        }
    }

    // metodo para recordar usuario
    async recordarUsuario(correo: string): Promise<any> {
        try {
            // Verificar si el correo existe
            const usuario = await this.usuariosService.findOneByCorreo(correo);
            if (!usuario) {
                throw new NotFoundException(`El correo "${correo}" no está registrado.`);
            }

            // mostrar el usuario encontrado
            console.log('Usuario encontrado:', usuario);
        

            // Enviar correo con el token (implementa tu lógica de envío de correo aquí)
            // await this.sendResetPasswordEmail(usuario.correo);

            return { 
                message: 'Se ha encontrado un usuario que coincide con su correo',
                usuario: usuario.nombreUsuario
            };
        } catch (error) {
            console.error('Error en recordar usuario:', error.message);
            throw new UnauthorizedException('Error al recordar usuario', error.message);
        }
    }

    // metodo para reestablecer contraseña
    async buscarCoincidencias(nombreUsuario: string, correo: string): Promise<boolean> {
        try {
            // verificar si el usuario existe
            const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);

            // verificar si el correo existe
            const usuarioCorreo = await this.usuariosService.findOneByCorreo(correo);

            // verificar si el usuario y correo son del mismo usuario
            if (usuarioCorreo && usuarioCorreo.nombreUsuario !== nombreUsuario) {
                throw new UnauthorizedException('El correo no coincide con el nombre de usuario');
            }
            if (!usuario) {
                throw new NotFoundException(`El usuario "${nombreUsuario}" no existe.`);
            }
            if (!usuarioCorreo) {
                throw new NotFoundException(`El correo "${correo}" no está registrado.`);
            }

            // retornar un true si el usuario y correo son del mismo usuario
            const coincidencia = usuarioCorreo.nombreUsuario === nombreUsuario && usuarioCorreo.correo === correo;
            console.log('Coincidencia encontrada:', coincidencia);
            return coincidencia;

        } catch (error) {
            throw new UnauthorizedException(`Error al reestablecer la clave: ${error.message}`);
        }
    }
    async reestablecerClave(nombreUsuario: string, correo: string, clave: string, confirmarClave: string): Promise<any> {
        try {
            // verificar si las coincidencias son correctas

            const coincidencias = await this.buscarCoincidencias(nombreUsuario, correo);
            if (!coincidencias) {
                throw new UnauthorizedException('El usuario y correo no coinciden');
            }

            // verificar si la clave es válida
            if (clave !== confirmarClave) {
                throw new UnauthorizedException('Las claves no coinciden');
            }

            // verificar si la clave cumple con los requisitos
            // const claveValida =  this.validarClave(clave);
            // if(!claveValida) {
            //     throw new UnauthorizedException('La clave no cumple con los requisitos de seguridad');
            // }
            
            // actualizar la nueva clave el usuario
            const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (!usuario) {
                throw new NotFoundException(`El usuario "${nombreUsuario}" no existe.`);
            }
            const hashedClave = await bcrypt.hash(clave, 10); // Hashear la nueva contraseña
            usuario.clave = hashedClave;
            usuario.updatedAt = new Date(); // Actualizar la fecha de modificación
            const updatedUser = await this.usuarioRepository.save(usuario); // Guardar el usuario actualizado
            console.log('Clave reestablecida correctamente');
            return { message: 'Clave reestablecida correctamente' };
        } catch (error) {
            throw new UnauthorizedException(`Error al reestablecer la clave: ${error.message}`);
        }
    }

    // metodo para validar la clave
    private async validarClave(clave: string): Promise<void> {
        const minimoCaracteres = 6;
        const maximoCaracteres = 20;
        const tieneMayuscula = /[A-Z]/;
        const tieneMinuscula = /[a-z]/;
        const tieneNumero = /\d/;
        const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

        if (clave.length < minimoCaracteres || clave.length > maximoCaracteres) {
            throw new UnauthorizedException(`La clave debe tener entre ${minimoCaracteres} y ${maximoCaracteres} caracteres`);
        }
        if (!tieneMayuscula.test(clave)) {
            throw new UnauthorizedException('La clave debe tener al menos una letra mayúscula');
        }
        if (!tieneMinuscula.test(clave)) {
            throw new UnauthorizedException('La clave debe tener al menos una letra minúscula');
        }
        if (!tieneNumero.test(clave)) {
            throw new UnauthorizedException('La clave debe tener al menos un número');
        }
        if (!tieneCaracterEspecial.test(clave)) {
            throw new UnauthorizedException('La clave debe tener al menos un carácter especial');
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
