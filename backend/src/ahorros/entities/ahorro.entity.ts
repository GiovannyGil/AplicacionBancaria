OneToMany, OneToOne PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Ahorros' })
export class Ahorro {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numberCard', type: 'varchar', length: 16, nullable: false })
    numberCard: string

    @Column({ name: 'codeCard', type: 'varchar', length: 3, nullable: false })
    codeCard: string

    @Column({ name: 'dateCard', type: 'date', nullable: false })
    dateCard: Date

    @Column({ name: 'goal', type: 'varchar', length: 20, nullable: false })
    goal: string

    @Column({ name: 'MonthContribution', type: 'varchar', nullable: false })
    MonthContribution: number

    @ManyToOne(() => Usuario, usuario => usuario.tarjeta)
    user: Usuario[]
}

