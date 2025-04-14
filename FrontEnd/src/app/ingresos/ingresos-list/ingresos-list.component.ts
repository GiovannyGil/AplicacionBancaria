import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-ingresos-list',
  templateUrl: './ingresos-list.component.html',
  styleUrls: ['./ingresos-list.component.css']
})
export class IngresosListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de ingresos vacio por defecto []
  ingresos: any[] = []

  // inyectar servicio
  constructor(private ingresosService: IngresosService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerIngresos()
  }

  // metodo para obtener ususarios
  obtenerIngresos(): void {
    try {
      this.ingresosService.ObtenerIngresoes().subscribe(
        (data) => {
          this.ingresos = data.ingresos // obtener un array de ingresos que trae el objeto
        },
        (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los ingresos ${error.message}`)
          }
        }
      )
    } catch (error) {
      console.log(`Error al Obtener los ingresos ${error}`);
    }

  }

  // metod para eliminar un ingreso
  eliminaringreso(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este ingreso?')) {

        this.ingresosService.EliminarIngreso(id).subscribe(
          () => {
            this.ingresos = this.ingresos.filter(ingreso => ingreso.id !== id)
            alert('ingresos Eliminado Exitosamente')
          },
          (error) => {
            console.error('Error al eliminar ingreso:', error.message);
            alert('Error al eliminar la ingreso');
          }
        )
      }
    } catch (error) {
      console.error('Error al eliminar ingreso:', error);
      alert('Error al eliminar la ingreso');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/ingresos/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/ingresos/update/${id}`]);
  }
  
}
