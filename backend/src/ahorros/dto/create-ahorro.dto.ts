import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAhorroDto {
    @IsString({ message: 'El nombre del ahorro debe ser un string' })
    @IsNotEmpty({ message: 'El nombre del ahorro no puede estar vacío' })
    @Length(30, 30, { message: 'El nombre del ahorro debe tener 30 caracteres' })
    nombre: string;

    @IsDate({ message: 'La fecha de la meta debe ser una fecha' })
    @IsNotEmpty({ message: 'La fecha de la meta no puede estar vacía' })
    fechaMeta: Date;

    @IsInt({ message: 'La cantidad de cuotas debe ser un número entero' })
    @IsNotEmpty({ message: 'La cantidad de cuotas no puede estar vacía' })
    cantidadCuotas: number;

    @IsInt({ message: 'El monto de la meta debe ser un número entero' })
    @IsNotEmpty({ message: 'El monto de la meta no puede estar vacío' })
    montoMeta: number;

    @IsInt({ message: 'El ahorro mensual debe ser un número entero' })
    @IsNotEmpty({ message: 'El ahorro mensual no puede estar vacío' })
    ahorroMensual: number;

    @IsInt({ message: 'El tipo de ahorro debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ahorro no puede estar vacío' })
    tipo: number;

    @IsInt({ message: 'El usuarioID debe ser un número entero' })
    @IsNotEmpty({ message: 'El usuarioID no puede estar vacío' })
    usuarioID: number;
}
