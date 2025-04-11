import { Component } from '@angular/core';
import { CreditosService } from '../creditos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditos-create',
  templateUrl: './creditos-create.component.html',
  styleUrls: ['./creditos-create.component.css']
})
export class CreditosCreateComponent {
  numero: number = 0;
  nombre: string = '';
  fechaExpira: Date = new Date(); // Cambiar por la fecha de expiración
  cantidadCuotas: number = 0;
  montoFinal: number = 0;
  interesMensual: number = 0;
  interesTotal: number = 0;
  debitoMensual: number = 0;
  tipo: number = 1; // Cambiar por el tipo de credito
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private creditoService: CreditosService, private router: Router) { }

  // metodo para crear un credito
  crearcredito(): void {
    const nuevocredito = {
      numero: this.numero,
      nombre: this.nombre,
      fechaExpira: this.fechaExpira,
      cantidadCuotas: this.cantidadCuotas,
      montoFinal: this.montoFinal,
      interesMensual: this.interesMensual,
      interesTotal: this.interesTotal,
      debitoMensual: this.debitoMensual,
      tipo: this.tipo,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.creditoService.CrearCredito(nuevocredito).subscribe(
      () => {
        alert('credito creado exitosamente')
        this.router.navigate(['/creditos'])
      }, (error: { message: any; }) => {
        console.log(`Error al crear el credito ${error.message}`);
      }
    )
  }
}