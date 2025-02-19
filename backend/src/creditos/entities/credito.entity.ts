import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Creditos' })
export class Credito {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numero', type: 'varchar', length: 16, nullable: false })
    numero: string

    @Column({ name: 'nombre', type: 'varchar', length: 30, nullable: false })
    nombre: string

    @Column({ name: 'fechaMeta', type: 'date', nullable: false })
    fechaExpira: Date

    @Column({ name: 'cantidadCuotas', type: 'int', nullable: false })
    cantidadCuotas: number

    @Column({ name: 'montoMeta', type: 'int', nullable: false })
    montoFinal: number

    @Column({ name: 'interesMensual', type: 'int', nullable: false })
    interesMensual: number

    @Column({ name: 'interesTotal', type: 'int', nullable: false })
    interesTotal: number

    @Column({ name: 'AhorroMensual', type: 'varchar', nullable: false })
    debitoMensual: number

    @Column({ name: 'tipo', type: 'int', nullable: false, default: 1 })
    tipo: number

    @ManyToOne(() => Usuario, (usuario) => usuario.creditos)
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
