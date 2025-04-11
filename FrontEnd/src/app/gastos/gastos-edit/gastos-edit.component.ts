import { Component } from '@angular/core';
import { GastosService } from '../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gastos-edit',
  templateUrl: './gastos-edit.component.html',
  styleUrls: ['./gastos-edit.component.css']
})
export class GastosEditComponent {
  id!: number;
  numeroGasto: string = '';
  valorPago: number = 0;
  valorFinal: number = 0;
  gastoID: number = 1; // Cambiar por el ID del gasto logueado

  constructor(
    private gastoServide: GastosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido: ', this.id);
    if (this.id) {
      this.cargarDatosgasto(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el gasto');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatosgasto(): void {
    this.gastoServide.ObtenerGastoID(this.id).subscribe(
      (response: { gasto: any; }) => {
        console.log('Datos Obtenidos', response);
        const gasto = response.gasto // acceder a los datos

        // asignar los valores
        this.numeroGasto = gasto.numerogasto;
        this.valorPago = gasto.valorPago;
        this.valorFinal = gasto.valorFinal;
        this.gastoID = gasto.usuarioID;
      }, (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }


  // metodo para actulizar
  actualizargasto(): void {
    const gastoActualizado = {
      numerogasto: this.numeroGasto,
      valorPago: this.valorPago,
      valorFinal: this.valorFinal,
      usuarioID: this.gastoID
    }

    console.log('Datos a enviar ', gastoActualizado);

    this.gastoServide.EditarGasto(this.id, gastoActualizado).subscribe(
      () => {
        alert('gasto actualizado exitosamente')
        this.router.navigate(['/gastos'])
      },
      (error: { message: any; }) => {
        console.log(`Error al actualizar el gasto ${error.message}`);
      }
    )
  }
}