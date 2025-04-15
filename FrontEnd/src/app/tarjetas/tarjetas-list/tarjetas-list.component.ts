import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TarjetasService } from '../tarjetas.service';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css']
})
export class TarjetasListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de tarjetas vacio por defecto []
  tarjetas: any[] = []

  // inyectar servicio
  constructor(private tarjetasService: TarjetasService, private router: Router) { }

  ngOnInit(): void {
    this.obtenertarjetas()
  }

  // metodo para obtener ususarios
  obtenertarjetas(): void {
    try {
      this.tarjetasService.ObtenerTarjetas().subscribe(
        (data) => {
          this.tarjetas = data // obtener un array de tarjetas que trae el objeto
        },
        (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los tarjetas ${error.message}`)
          }
        }
      )
    } catch (error) {
      console.log(`Error al Obtener los tarjetas ${error}`);
    }

  }

  // metod para eliminar un tarjeta
  eliminartarjeta(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este tarjeta?')) {

        this.tarjetasService.EliminarTarjeta(id).subscribe(
          () => {
            this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id !== id)
            alert('tarjetas Eliminado Exitosamente')
          },
          (error) => {
            console.error('Error al eliminar tarjeta:', error.message);
            alert('Error al eliminar la tarjeta');
          }
        )
      }
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
      alert('Error al eliminar la tarjeta');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/tarjetas/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/tarjetas/update/${id}`]);
  }
}
