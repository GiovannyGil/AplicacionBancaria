import { Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 20, { message: 'el tamaño es de maximo 20 carácteres' })
    primerNombre: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 20, { message: 'el tamaño es de maximo 20 carácteres' })
    segundoNombre: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 20, { message: 'el tamaño es de maximo 20 carácteres' })
    primerApellido: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 20, { message: 'el tamaño es de maximo 20 carácteres' })
    segundoApellido: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 30, { message: 'el tamaño es de maximo 30 carácteres' })
    correo: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 100, { message: 'el tamaño es de maximo 100 carácteres' })
    clave: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsOptional({ message: 'the field is Optional' })
    @Length(1, 50, { message: 'el tamaño es de maximo 50 carácteres' })
    direccion: string

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 10, { message: 'el tamaño es de maximo 10 carácteres' })
    celular: string

    @IsString({ message: 'the field is a boolean' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    estado: boolean

    @IsString({ message: 'el campo debe ser un string' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @Length(1, 1, { message: 'el tamaño es de un carácter' })
    genero: string

    @IsString({ message: 'the field is a date' })
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    fechaCreacion: Date

}
