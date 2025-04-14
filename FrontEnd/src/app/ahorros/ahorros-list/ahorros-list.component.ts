import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AhorrosService } from '../ahorros.service';


@Component({
  selector: 'app-ahorros-list',
  templateUrl: './ahorros-list.component.html',
  styleUrls: ['./ahorros-list.component.css']
})
export class AhorrosListComponent {

  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de ahorros vacio por defecto []
  ahorros: any[] = []

  // inyectar servicio
  constructor(private ahorrosService: AhorrosService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerahorros()
  }

  // metodo para obtener ususarios
  obtenerahorros(): void {
    try {
      this.ahorrosService.ObtenerAhorros().subscribe(
        (data) => {
          this.ahorros = data.ahorros // obtener un array de ahorros que trae el objeto
        },
        (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los ahorros ${error.message}`)
          }
        }
      )
    } catch (error) {
      console.log(`Error al Obtener los ahorros ${error}`);
    }

  }

  // metod para eliminar un ahorro
  eliminarahorro(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este ahorro?')) {

        this.ahorrosService.EliminarAhorro(id).subscribe(
          () => {
            this.ahorros = this.ahorros.filter(ahorro => ahorro.id !== id)
            alert('ahorros Eliminado Exitosamente')
          },
          (error) => {
            console.error('Error al eliminar ahorro:', error.message);
            alert('Error al eliminar la ahorro');
          }
        )
      }
    } catch (error) {
      console.error('Error al eliminar ahorro:', error);
      alert('Error al eliminar la ahorro');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/ahorros/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/ahorros/update/${id}`]);
  }
}
