import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAhorroDto {
    @IsString()
    @IsNotEmpty()
    @Length(30, 30)
    nombre: string;

    @IsDate()
    @IsNotEmpty()
    fechaMeta: Date;

    @IsInt()
    @IsNotEmpty()
    cantidadCuotas: number;

    @IsInt()
    @IsNotEmpty()
    montoMeta: number;

    @IsInt()
    @IsNotEmpty()
    ahorroMensual: number;

    @IsInt()
    @IsNotEmpty()
    tipo: number;

    @IsInt()
    @IsNotEmpty()
    usuarioID: number;
}
