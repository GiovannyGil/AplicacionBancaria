import { IsDate, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateTarjetaDto {
    @IsString({ message: 'El número de tarjeta debe ser un string' })
    @IsNotEmpty({ message: 'El número de tarjeta no puede estar vacío' })
    @Length(16, 16, { message: 'El número de tarjeta debe tener 16 caracteres' })
    @Matches(/^\d+$/, { message: 'El número de tarjeta solo puede contener dígitos' })
    numero: string;
    
    @IsString({ message: 'El código de la tarjeta debe ser un string' })
    @IsNotEmpty({ message: 'El código de la tarjeta no puede estar vacío' })
    @Length(3, 3, { message: 'El código de la tarjeta debe tener 3 caracteres' })
    @Matches(/^\d+$/, { message: 'El número de tarjeta solo puede contener dígitos' })
    codigo: string;

    @IsInt({ message: 'El tipo de tarjeta debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de tarjeta no puede estar vacío' })
    tipo: number;

    @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía' })
    @IsDate({ message: 'La fecha de expiración debe ser una fecha' })
    fechaExpira: Date;

    @IsInt({ message: 'El usuarioID debe ser un número entero' })
    @IsNotEmpty({ message: 'El usuarioID no puede estar vacío' })
    usuarioID: number;
}
