import { Component } from '@angular/core';
import { IngresosService } from '../ingresos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingresos-edit',
  templateUrl: './ingresos-edit.component.html',
  styleUrls: ['./ingresos-edit.component.css']
})
export class IngresosEditComponent {
  id!: number;
  nombreIngreso: string = '';
  valorIngreso: number = 0;
  valorFinal: number = 0;
  usuarioID: number = 1; // Cambiar por el ID del ingreso logueado

  constructor(
    private ingresoServide: IngresosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.cargarDatosingreso(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el ingreso');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatosingreso(): void {
    this.ingresoServide.ObtenerIngresoeID(this.id).subscribe({
      next: (response) => {
        const ingreso = response // acceder a los datos

        // asignar los valores
        this.nombreIngreso = ingreso.nombreIngreso;
        this.valorIngreso = ingreso.valorIngreso;
        this.valorFinal = ingreso.valorFinal;
        this.usuarioID = ingreso.usuarioID;
      }, 
      error: (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    })
  }


  // metodo para actulizar
  actualizaringreso(): void {
    const ingresoActualizado = {
      nombreIngreso: this.nombreIngreso,
      valorIngreso: this.valorIngreso,
      valorFinal: this.valorFinal,
      usuarioID: this.usuarioID
    }
    this.ingresoServide.EditarIngreso(this.id, ingresoActualizado).subscribe({
      next: () => {
        alert('ingreso actualizado exitosamente')
        this.router.navigate(['/ingresos'])
      },
      error: (error: { message: any; }) => {
        console.log(`Error al actualizar el ingreso ${error.message}`);
      }
    })
  }
}
