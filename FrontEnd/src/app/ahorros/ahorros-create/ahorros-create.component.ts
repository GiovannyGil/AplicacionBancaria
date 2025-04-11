import { Component } from '@angular/core';
import { AhorrosService } from '../ahorros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorros-create',
  templateUrl: './ahorros-create.component.html',
  styleUrls: ['./ahorros-create.component.css']
})
export class AhorrosCreateComponent {
  nombre: string = '';
  fechaMeta: Date = new Date(); // Cambiar por la fecha de Meta
  cantidadCuotas: number = 0;
  montoMeta: number = 0;
  ahorroMensual: number = 0;
  tipo: number = 1; // Cambiar por el tipo de ahorro
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private ahorroService: AhorrosService, private router: Router) { }

  // metodo para crear un ahorro
  crearahorro(): void {
    const nuevoahorro = {
      nombre: this.nombre,
      fechaMeta: this.fechaMeta,
      cantidadCuotas: this.cantidadCuotas,
      montoMeta: this.montoMeta,
      ahorroMensual: this.ahorroMensual,
      tipo: this.tipo,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.ahorroService.CrearAhorro(nuevoahorro).subscribe(
      () => {
        alert('ahorro creado exitosamente')
        this.router.navigate(['/ahorros'])
      }, (error: { message: any; }) => {
        console.log(`Error al crear el ahorro ${error.message}`);
      }
    )
  }
}