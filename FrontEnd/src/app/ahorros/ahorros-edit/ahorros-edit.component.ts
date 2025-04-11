import { Component } from '@angular/core';
import { AhorrosService } from '../ahorros.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ahorros-edit',
  templateUrl: './ahorros-edit.component.html',
  styleUrls: ['./ahorros-edit.component.css']
})
export class AhorrosEditComponent {
  id!: number;
  nombre: string = '';
  fechaMeta: Date = new Date(); // Cambiar por la fecha de Meta
  cantidadCuotas: number = 0;
  montoMeta: number = 0;
  ahorroMensual: number = 0;
  tipo: number = 1; // Cambiar por el tipo de ahorro
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  constructor(
    private ahorroServide: AhorrosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido: ', this.id);
    if (this.id) {
      this.cargarDatosahorro(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el ahorro');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatosahorro(): void {
    this.ahorroServide.ObtenerAhorrosID(this.id).subscribe(
      (response: { ahorro: any; }) => {
        console.log('Datos Obtenidos', response);
        const ahorro = response.ahorro // acceder a los datos

        // asignar los valores
        this.nombre = ahorro.nombre;
        this.fechaMeta = ahorro.fechaMeta;
        this.cantidadCuotas = ahorro.cantidadCuotas;
        this.montoMeta = ahorro.montoMeta;
        this.ahorroMensual = ahorro.ahorroMensual;
        this.tipo = ahorro.tipo;
        this.usuarioID = ahorro.usuarioID;
      }, (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }


  // metodo para actulizar
  actualizarahorro(): void {
    const ahorroActualizado = {
      nombre: this.nombre,
      fechaMeta: this.fechaMeta,
      cantidadCuotas: this.cantidadCuotas,
      montoMeta: this.montoMeta,
      ahorroMensual: this.ahorroMensual,
      tipo: this.tipo,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    console.log('Datos a enviar ', ahorroActualizado);

    this.ahorroServide.ActualizarAhorro(this.id, ahorroActualizado).subscribe(
      () => {
        alert('ahorro actualizado exitosamente')
        this.router.navigate(['/ahorros'])
      },
      (error: { message: any; }) => {
        console.log(`Error al actualizar el ahorro ${error.message}`);
      }
    )
  }
}