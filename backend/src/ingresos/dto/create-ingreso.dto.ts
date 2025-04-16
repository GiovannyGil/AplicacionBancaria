import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateIngresoDto {

    @IsString({ message: 'El nombre del ingreso debe ser un string' })
    @IsNotEmpty({ message: 'El nombre del ingreso no puede estar vacío' })
    @Length(4, 50, { message: 'El nombre del ingreso debe tener entre 4 y 50 caracteres' })
    nombreIngreso: string;

    @IsInt({ message: 'El valor del ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El valor del ingreso no puede estar vacío' })
    valorIngreso: number;
    
    
    @IsInt({ message: 'El tipo de ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ingreso no puede estar vacío' })
    valorFinal: number;
    
    @IsInt({ message: 'El tipo de ingreso debe ser un número entero' })
    @IsNotEmpty({ message: 'El tipo de ingreso no puede estar vacío' })
    usuarioID: number;
}
