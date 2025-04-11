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
  tipo: number = 1; // Cambiar por el tipo de tarjeta
  usuarioID: number = 1; // Cambiar por el ID del usuario logueado

  // Constructor
  constructor(private tarjetaService: TarjetasService, private router: Router) { }

  // metodo para crear un tarjeta
  creartarjeta(): void {
    const nuevotarjeta = {
      numero: this.numero,
      codigo: this.codigo,
      fechaExpira: this.fechaExpira,
      tipo: this.tipo,
      usuarioID: 1 // Cambiar por el ID del usuario logueado
    }

    this.tarjetaService.CrearTarjeta(nuevotarjeta).subscribe(
      () => {
        alert('tarjeta creado exitosamente')
        this.router.navigate(['/tarjetas'])
      }, (error: { message: any; }) => {
        console.log(`Error al crear el tarjeta ${error.message}`);
      }
    )
  }
}