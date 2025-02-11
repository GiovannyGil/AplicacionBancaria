import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTarjetaDto {
    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    numero: string;
   
    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    codigo: string;

    @IsInt()
    @IsNotEmpty()
    tipo: number;

    @IsNotEmpty()
    @IsDate()
    fechaExpira: Date;

    @IsInt()
    @IsNotEmpty()
    usuarioID: number;
}
