import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Ingresos' })
export class Ingreso {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'nombreIngreso', type: 'varchar', length: 50, nullable: false })
    nombreIngreso: string

    @Column({ name: 'valorIngreso', type: 'int', nullable: false })
    valorIngreso: number

    @Column({ name: 'valorFinal', type: 'int', nullable: false })
    valorFinal: number

    @ManyToOne(() => Usuario, (usuario) => usuario.ingresos)
    @JoinColumn()
    usuario: Usuario

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deletedAt: Date

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }
        
    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
