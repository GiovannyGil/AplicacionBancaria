OneToMany, OneToOne PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Creditos' })
export class Credito {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numberCard', type: 'varchar', length: 16, nullable: false })
    numberCard: string

    @Column({ name: 'codeCard', type: 'varchar', length: 3, nullable: false })
    codeCard: string

    @Column({ name: 'dateCard', type: 'date', nullable: false })
    dateCard: Date

    @ManyToOne(() => Usuario, usuario => usuario.tarjeta)
    user: Usuario[]
}
