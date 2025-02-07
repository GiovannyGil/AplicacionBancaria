import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Tarjetas' })
export class Tarjeta {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numberCard', type: 'varchar', length: 16, nullable: false })
    numberCard: string

    @Column({ name: 'codeCard', type: 'varchar', length: 3, nullable: false })
    codeCard: string

    @Column({ name: 'tipo', type: 'int', nullable: false, default: 1 })
    tipo: number

    @Column({ name: 'dateCard', type: 'date', nullable: false })
    dateCard: Date

    @ManyToOne(() => Usuario, usuario => usuario.tarjeta)
    user: Usuario[]
}
