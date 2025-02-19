import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Gastos' })
export class Gasto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'nombreGasto', type: 'varchar', length: 50, nullable: false })
    nombreGasto: string

    @Column({ name: 'valorPago', type: 'int', nullable: false })
    valorPago: number

    @Column({ name: 'valorFinal', type: 'int', nullable: false })
    valorFinal: number

    /**
     * un usuario tiene uno o mas gastos
     * un gasto pertenece a un usuario
     */
    @ManyToOne(() => Usuario, (usuario) => usuario.gastos)
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
