import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Ahorro } from "src/ahorros/entities/ahorro.entity";
import { Gasto } from "src/gastos/entities/gasto.entity";
import { Credito } from "src/creditos/entities/credito.entity";
import { Tarjeta } from "src/tarjetas/entities/tarjeta.entity";

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'primerNombre', type: 'varchar', length: 20, nullable: false })
    primerNombre: string

    @Column({ name: 'segundoNombre', type: 'varchar', length: 20, nullable: false })
    segundoNombre: string

    @Column({ name: 'firsprimerApellidotLastName', type: 'varchar', length: 20, nullable: false })
    primerApellido: string

    @Column({ name: 'seundoApellido', type: 'varchar', length: 20, nullable: false })
    seundoApellido: string

    @Column({ name: 'correo', type: 'varchar', length: 30, nullable: false })
    correo: string

    @Column({ name: 'clave', type: 'varchar', length: 100, nullable: false })
    clave: string

    @Column({ name: 'dirrecion', type: 'varchar', length: 50, nullable: true })
    dirrecion: string

    @Column({ name: 'celular', type: 'varchar', length: 10, nullable: false, unique: true })
    celular: string

    @Column({ name: 'estado', type: 'boolean', nullable: false, default: true })
    estado: boolean

    @Column({ name: 'genero', type: 'varchar', length: 1, nullable: false })
    genero: string

    @Column({ name: 'fechaCreacion', type: 'date', nullable: false })
    fechaCreacion: Date

    /**
     * un usuario tiene uno o mas ahorros
     * un ahorro pertenece a un usuario
     */
    @OneToMany(() => Ahorro, ahorro => ahorro.usuario)
    ahorros: Ahorro[]

    /**
     * un usuario tiene uno o mas gastos
     * un gasto pertenece a un usuario
     */
    @OneToMany(() => Gasto, gasto => gasto.usuario)
    gastos: Gasto[]

    /**
    * un usuario tiene uno o mas gastos
    * un gasto pertenece a un usuario
    */
    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario)
    tarjetas: Tarjeta[]

    /**
    * un usuario tiene uno o mas gastos
    * un gasto pertenece a un usuario
    */
    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario)
    creditos: Credito[]

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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.clave && !this.clave.startsWith('$2b$')) { // Verifica si no está ya encriptada
            const salt = await bcrypt.genSalt(10);
            this.clave = await bcrypt.hash(this.clave, salt);
        }
    }

}
