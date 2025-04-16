import { Component } from '@angular/core';
import { IngresosService } from '../ingresos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos-create',
  templateUrl: './ingresos-create.component.html',
  styleUrls: ['./ingresos-create.component.css']
})
export class IngresosCreateComponent {
  nombreIngreso: string = '';
  valorIngreso: number = 0;
  valorFinal: number = 0;
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private ingresoService: IngresosService, private router: Router) { }

  // metodo para crear un ingreso
  crearingreso(): void {
    const nuevoingreso = {
      nombreIngreso: this.nombreIngreso,
      valorIngreso: this.valorIngreso,
      valorFinal: this.valorFinal,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.ingresoService.CrearIngreso(nuevoingreso).subscribe(
      () => {
        alert('ingreso creado exitosamente')
        this.router.navigate(['/ingresos'])
      }, (error) => {
        console.log(`Error al crear el ingreso ${error.message}`);
      }
    )
  }
}
