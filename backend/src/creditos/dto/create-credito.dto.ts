import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCreditoDto {
    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    numero: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDate()
    @IsNotEmpty()
    fechaExpira: Date;

    @IsInt()
    @IsNotEmpty()
    cantidadCuotas: number;

    @IsInt()
    @IsNotEmpty()
    montoFinal: number;

    @IsInt()
    @IsNotEmpty()
    interesMensual: number;

    @IsInt()
    @IsNotEmpty()
    interesTotal: number;

    @IsInt()
    @IsNotEmpty()
    debitoMensual: number;

    @IsInt()
    @IsNotEmpty()
    tipo: number;

    @IsInt()
    @IsNotEmpty()
    usuarioID: number;
}
