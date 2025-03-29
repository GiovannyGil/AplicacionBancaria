import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateIngresoDto {
    @IsString({ message: 'El nombre del ingreso debe ser un string' })
    @IsNotEmpty({ message: 'El nombre del ingreso no puede estar vacío' })
    @Length(16, 16, { message: 'El nombre del ingreso debe tener 16 caracteres' })
    numeroIngreso: string;
            
    @IsInt({ message: 'El tipo de ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ingreso no puede estar vacío' })
    valorPago: number;
    
    @IsInt({ message: 'El tipo de ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ingreso no puede estar vacío' })
    valorFinal: number;
    
    @IsInt({ message: 'El tipo de ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ingreso no puede estar vacío' })
    usuarioID: number;
}
