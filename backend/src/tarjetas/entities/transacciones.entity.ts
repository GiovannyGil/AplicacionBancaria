import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tarjeta } from "./tarjeta.entity";

@Entity({ name: 'Transacciones' })
export class Transaccion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tarjeta, (tarjeta) => tarjeta.transacciones)
    @JoinColumn({ name: "tarjetaID" })
    tarjeta: Tarjeta;

    @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2, nullable: false })
    monto: number;

    @Column({ name: 'tipo', type: 'varchar', length: 10 }) // "compra" o "pago"
    tipo: string;

    @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;
}
