import { Component } from '@angular/core';
import { GastosService } from '../gastos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos-create',
  templateUrl: './gastos-create.component.html',
  styleUrls: ['./gastos-create.component.css']
})
export class GastosCreateComponent {
  nombreGasto: string = '';
  valorPago: number = 0;
  valorFinal: number = 0;
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private gastoService: GastosService, private router: Router) { }

  // metodo para crear un gasto
  creargasto(): void {
    const nuevogasto = {
      nombreGasto: this.nombreGasto,
      valorPago: this.valorPago,
      valorFinal: this.valorFinal,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.gastoService.CrearGasto(nuevogasto).subscribe(
      () => {
        alert('gasto creado exitosamente')
        this.router.navigate(['/gastos'])
      }, (error) => {
        console.log(`Error al crear el gasto ${error.message}`);
      }
    )
  }
}
