import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Ahorros' })
export class Ahorro {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'nombre', type: 'varchar', length: 30, nullable: false })
    nombre: string

    @Column({ name: 'fechaMeta', type: 'date', nullable: false })
    fechaMeta: Date

    @Column({ name: 'cantidadCuotas', type: 'int', nullable: false })
    cantidadCuotas: number

    @Column({ name: 'montoMeta', type: 'int', nullable: false })
    montoMeta: number

    @Column({ name: 'AhorroMensual', type: 'int', nullable: false })
    ahorroMensual: number

    @Column({ name: 'tipo', type: 'int', nullable: false, default: 1 })
    tipo: number

    /**
     * un usuario tiene uno o mas ahorros
     * un ahorro pertenece a un usuario
     */
    @ManyToOne(() => Usuario, (usuario) => usuario.ahorros)
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

