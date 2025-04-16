import { Component } from '@angular/core';
import { CreditosService } from '../creditos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creditos-edit',
  templateUrl: './creditos-edit.component.html',
  styleUrls: ['./creditos-edit.component.css']
})
export class CreditosEditComponent {
  id!: number;
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

  constructor(
    private creditoServide: CreditosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido: ', this.id);
    if (this.id) {
      this.cargarDatoscredito(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el credito');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatoscredito(): void {
    this.creditoServide.ObtenerCreditoID(this.id).subscribe(
      (response) => {
        console.log('Datos Obtenidos', response);
        const credito = response // acceder a los datos

        // asignar los valores
        this.numero = credito.numero;
        this.nombre = credito.nombre;
        this.fechaExpira = credito.fechaExpira;
        this.cantidadCuotas = credito.cantidadCuotas;
        this.montoFinal = credito.montoFinal;
        this.interesMensual = credito.interesMensual;
        this.interesTotal = credito.interesTotal;
        this.debitoMensual = credito.debitoMensual;
        this.tipo = credito.tipo;
        this.usuarioID = credito.usuarioID;
      }, (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }


  // metodo para actulizar
  actualizarcredito(): void {
    const creditoActualizado = {
      numero: this.numero,
      nombre: this.nombre,
      fechaExpira: this.fechaExpira,
      cantidadCuotas: this.cantidadCuotas,
      montoFinal: this.montoFinal,
      interesMensual: this.interesMensual,
      interesTotal: this.interesTotal,
      debitoMensual: this.debitoMensual,
      tipo: this.tipo,
    }

    console.log('Datos a enviar ', creditoActualizado);

    this.creditoServide.EditarCredito(this.id, creditoActualizado).subscribe(
      () => {
        alert('credito actualizado exitosamente')
        this.router.navigate(['/creditos'])
      },
      (error: { message: any; }) => {
        console.log(`Error al actualizar el credito ${error.message}`);
      }
    )
  }
}
