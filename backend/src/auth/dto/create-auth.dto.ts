import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsOptional()
    nombreUsuario: string;

    @IsString()
    @IsOptional()
    correo: string;

    @IsString()
    @IsNotEmpty()
    clave: string;
}
