import { IsDate, IsIn, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateGastoDto {
        @IsString()
        @IsNotEmpty()
        @Length(16, 16)
        numeroGasto: string;
       
        @IsInt()
        @IsNotEmpty()
        valorPago: number;

        @IsInt()
        @IsNotEmpty()
        valorFinal: number;

        @IsInt()
        @IsNotEmpty()
        usuarioID: number;
}
