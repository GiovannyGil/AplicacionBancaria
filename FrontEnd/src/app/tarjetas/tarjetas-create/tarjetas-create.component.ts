import { Component } from '@angular/core';
import { TarjetasService } from '../tarjetas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-create',
  templateUrl: './tarjetas-create.component.html',
  styleUrls: ['./tarjetas-create.component.css']
})
export class TarjetasCreateComponent {
  numero: number = 0;
  codigo: number = 0;
  fechaExpira: Date = new Date(); // Cambiar por la fecha de expiración
  cupoTotal: number = 0; // Cambiar por el cupo total
  cupoDisponible: number = 0; // Cambiar por el cupo disponible
  deuda: number = 0; // Cambiar por la deuda
  saldoDebito: number = 0; // Cambiar por el saldo de débito
  tipo: number = 1; // Cambiar por el tipo de tarjeta
  fechaPagos: Date = new Date(); // Cambiar por la fecha de pagos
  fechaCompra: Date = new Date(); // Cambiar por la fecha de compra
  estado: boolean = true; // Estado por defecto (activo)
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private tarjetaService: TarjetasService, private router: Router) { }

  // metodo para crear un tarjeta
  creartarjeta(): void {
    const nuevotarjeta = {
      numero: this.numero,
      codigo: this.codigo,
      fechaExpira: this.fechaExpira,
      cupoTotal: this.cupoTotal,
      cupoDisponible: this.cupoDisponible,
      deuda: this.deuda,
      saldoDebito: this.saldoDebito,
      tipo: this.tipo,
      fechaPagos: this.fechaPagos,
      fechaCompra: this.fechaCompra,
      estado: this.estado,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.tarjetaService.CrearTarjeta(nuevotarjeta).subscribe({
      next: () => {
        alert('tarjeta creado exitosamente')
        this.router.navigate(['/tarjetas'])
      }, 
      error: (error: { message: any; }) => {
        console.log(`Error al crear el tarjeta ${error.message}`);
      }
    })
  }
}