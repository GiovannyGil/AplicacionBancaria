import { IsDate, IsIn, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateGastoDto {
        @IsString({ message: 'El nombre del gasto debe ser un string' })
        @IsNotEmpty({ message: 'El nombre del gasto no puede estar vacío' })
        @Length(16, 16, { message: 'El nombre del gasto debe tener 16 caracteres' })
        numeroGasto: string;
        
        @IsInt({ message: 'El tipo de gasto debe ser un número entero' })
        @IsNotEmpty({ message: 'El tipo de gasto no puede estar vacío' })
        valorPago: number;

        @IsInt({ message: 'El tipo de gasto debe ser un número entero' })
        @IsNotEmpty({ message: 'El tipo de gasto no puede estar vacío' })
        valorFinal: number;

        @IsInt({ message: 'El tipo de gasto debe ser un número entero' })
        @IsNotEmpty({ message: 'El tipo de gasto no puede estar vacío' })
        usuarioID: number;
}
