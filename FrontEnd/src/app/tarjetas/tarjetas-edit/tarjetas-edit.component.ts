import { Component } from '@angular/core';
import { TarjetasService } from '../tarjetas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-edit',
  templateUrl: './tarjetas-edit.component.html',
  styleUrls: ['./tarjetas-edit.component.css']
})
export class TarjetasEditComponent {
  id!: number;
  numero: number = 0;
  codigo: number = 0;
  fechaExpira: Date = new Date(); // Cambiar por la fecha de expiración
  tipo: number = 1; // Cambiar por el tipo de tarjeta
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado


  constructor(
    private tarjetaServide: TarjetasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido: ', this.id);
    if (this.id) {
      this.cargarDatostarjeta(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el tarjeta');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatostarjeta(): void {
    this.tarjetaServide.ObtenerTarjetaID(this.id).subscribe(
      (response: { tarjeta: any; }) => {
        console.log('Datos Obtenidos', response);
        const tarjeta = response.tarjeta // acceder a los datos

        // asignar los valores
        this.numero = tarjeta.numero;
        this.codigo = tarjeta.codigo;
        this.fechaExpira = tarjeta.fechaExpira;
        this.tipo = tarjeta.tipo;
        this.usuarioID = tarjeta.usuarioID;
      }, (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }


  // metodo para actulizar
  actualizartarjeta(): void {
    const tarjetaActualizado = {
      numero: this.numero,
      codigo: this.codigo,
      fechaExpira: this.fechaExpira,
      tipo: this.tipo,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    console.log('Datos a enviar ', tarjetaActualizado);

    this.tarjetaServide.EditarTarjeta(this.id, tarjetaActualizado).subscribe(
      () => {
        alert('tarjeta actualizado exitosamente')
        this.router.navigate(['/tarjetas'])
      },
      (error: { message: any; }) => {
        console.log(`Error al actualizar el tarjeta ${error.message}`);
      }
    )
  }
}
