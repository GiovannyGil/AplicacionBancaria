import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'firstName', type: 'varchar', length: 20, nullable: false })
    firstName: string

    @Column({ name: 'SecondName', type: 'varchar', length: 20, nullable: false })
    SecondName: string

    @Column({ name: 'firstLastName', type: 'varchar', length: 20, nullable: false })
    firstLastName: string

    @Column({ name: 'secondLastName', type: 'varchar', length: 20, nullable: false })
    secondLastName: string

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: false })
    email: string

    @Column({ name: 'passwordUser', type: 'varchar', length: 100, nullable: false })
    passwordUser: string

    @Column({ name: 'address', type: 'varchar', length: 50, nullable: false })
    address: string

    @Column({ name: 'phone', type: 'varchar', length: 10, nullable: false, unique: true })
    phone: string

    @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
    status: boolean

    @Column({ name: 'gender', type: 'varchar', length: 1, nullable: false })
    gender: string

    @Column({ name: 'date', type: 'date', nullable: false })
    date: Date

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deletedAt: Date

}
