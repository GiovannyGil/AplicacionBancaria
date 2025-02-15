import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCreditoDto {
    @IsString({ message: 'El número de tarjeta debe ser un string' })
    @IsNotEmpty({ message: 'El número de tarjeta no puede estar vacío' })
    @Length(16, 16, { message: 'El número de tarjeta debe tener 16 caracteres' })
    numero: string;

    @IsString({ message: 'El código de la tarjeta debe ser un string' })
    @IsNotEmpty({ message: 'El código de la tarjeta no puede estar vacío' })
    nombre: string;

    @IsDate({ message: 'La fecha de expiración debe ser una fecha' })
    @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía' })
    fechaExpira: Date;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    cantidadCuotas: number;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    montoFinal: number;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    interesMensual: number;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    interesTotal: number;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    debitoMensual: number;

    @IsInt({ message: 'El cupo total debe ser un número entero' })
    @IsNotEmpty({ message: 'El cupo total no puede estar vacío' })
    tipo: number;

    @IsInt({ message: 'El usuarioID debe ser un número entero' })
    @IsNotEmpty({ message: 'El usuarioID no puede estar vacío' })
    usuarioID: number;
}
