import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'firstName', type: 'varchar', length: 20, nullable: false })
    primerNombre: string

    @Column({ name: 'SecondName', type: 'varchar', length: 20, nullable: false })
    segundoNombre: string

    @Column({ name: 'firstLastName', type: 'varchar', length: 20, nullable: false })
    primerApellido: string

    @Column({ name: 'secondLastName', type: 'varchar', length: 20, nullable: false })
    seundoApellido: string

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: false })
    correo: string

    @Column({ name: 'passwordUser', type: 'varchar', length: 100, nullable: false })
    clave: string

    @Column({ name: 'address', type: 'varchar', length: 50, nullable: true })
    dirrecion: string

    @Column({ name: 'phone', type: 'varchar', length: 10, nullable: false, unique: true })
    celular: string

    @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
    estado: boolean

    @Column({ name: 'gender', type: 'varchar', length: 1, nullable: false })
    genero: string

    @Column({ name: 'date', type: 'date', nullable: false })
    fechaCreacion: Date

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
