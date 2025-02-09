import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsString({ message: 'La clave debe ser un string' })
    @IsNotEmpty({ message: 'La clave es requerida' })
    @Length(6, 20, { message: 'La clave debe tener entre 6 y 20 caracteres' })
    clave: string;

    @IsString({ message: 'La clave debe ser un string' })
    @IsNotEmpty({ message: 'La clave es requerida' })
    @Length(6, 20, { message: 'La clave debe tener entre 6 y 20 caracteres' })
    nuevaClave: string;
}