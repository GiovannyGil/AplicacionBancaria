import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/usuarios/entities/usuario.entity"
import { Transaccion } from "./transacciones.entity";

@Entity({ name: 'Tarjetas' })
export class Tarjeta {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'numero', type: 'varchar', length: 16, nullable: false })
    numero: string

    @Column({ name: 'cupoTotal', type: 'decimal', precision: 10, scale: 2, nullable: true })
    cupoTotal: number

    @Column({ name: 'cupoDisponible', type: 'decimal', length: 3, scale: 2, nullable: true })
    cupoDisponible: number

    @Column({ name: 'deuda', type: 'decimal', length: 3, scale: 2, nullable: false })
    deuda: number

    @Column({ name: 'saldoDebito', type: 'decimal', precision: 10, scale: 2, nullable: true })
    saldoDebito: number;

    @Column({ name: 'codigo', type: 'varchar', length: 3, nullable: false })
    codigo: string

    @Column({ name: 'tipo', type: 'int', nullable: false, default: 1 })
    tipo: number

    @Column({ name: 'fechaPagos', type: 'date', nullable: true })
    fechaPagos: Date

    @Column({ name: 'fechaCompra', type: 'date', nullable: true })
    fechaCompra: Date

    @Column({ name: 'fechaExpira', type: 'date', nullable: true })
    fechaExpira: Date

    @Column({ name: 'estado', type: 'boolean', nullable: true, default: false })
    estado: boolean

    @OneToMany(() => Transaccion, transaccion => transaccion.tarjeta)
    transacciones: Transaccion[];


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
