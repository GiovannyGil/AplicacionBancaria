import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { GastosService } from '../gastos.service';
@Component({
  selector: 'app-gastos-list',
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.css']
})
export class GastosListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de gastos vacio por defecto []
  gastos: any[] = []

  // inyectar servicio
  constructor(private gastosService: GastosService, private router: Router) { }

  ngOnInit(): void {
    this.obtenergastos()
  }

  // metodo para obtener ususarios
  obtenergastos(): void {
    try {
      this.gastosService.ObtenerGastos().subscribe(
        (data) => {
          this.gastos = data.gastos // obtener un array de gastos que trae el objeto
        },
        (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe inicdiar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los gastos ${error.message}`)
          }
        }
      )
    } catch (error) {
      console.log(`Error al Obtener los gastos ${error}`);
    }

  }

  // metod para eliminar un gasto
  eliminargasto(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este gasto?')) {

        this.gastosService.EliminarGasto(id).subscribe(
          () => {
            this.gastos = this.gastos.filter(gasto => gasto.id !== id)
            alert('gastos Eliminado Exitosamente')
          },
          (error) => {
            console.error('Error al eliminar gasto:', error.message);
            alert('Error al eliminar la gasto');
          }
        )
      }
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      alert('Error al eliminar la gasto');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/gastos/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/gastos/update/${id}`]);
  }

}
