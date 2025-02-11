import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"

@Entity({ name: 'Tarjetas' })
export class Tarjeta {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numero', type: 'varchar', length: 16, nullable: false })
    numero: string

    @Column({ name: 'codigo', type: 'varchar', length: 3, nullable: false })
    codigo: string

    @Column({ name: 'tipo', type: 'int', nullable: false, default: 1 })
    tipo: number

    @Column({ name: 'fechaExpira', type: 'date', nullable: false })
    fechaExpira: Date

    /**
     * un usuario tiene uno o mas gastos
     * un gasto pertenece a un usuario
     */
    @ManyToOne(() => Usuario, usuario => usuario.tarjetas)
    @JoinColumn({ name: "usuarioID" })
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
