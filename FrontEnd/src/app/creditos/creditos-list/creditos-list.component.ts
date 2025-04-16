import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreditosService } from '../creditos.service';


@Component({
  selector: 'app-creditos-list',
  templateUrl: './creditos-list.component.html',
  styleUrls: ['./creditos-list.component.css']
})
export class CreditosListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de creditos vacio por defecto []
  creditos: any[] = []

  // inyectar servicio
  constructor(private creditosService: CreditosService, private router: Router) { }

  ngOnInit(): void {
    this.obtenercreditos()
  }

  // metodo para obtener ususarios
  obtenercreditos(): void {
    try {
      this.creditosService.ObtenerCreditos().subscribe(
        (data) => {
          this.creditos = data // obtener un array de creditos que trae el objeto
        },
        (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los creditos ${error.message}`)
          }
        }
      )
    } catch (error) {
      console.log(`Error al Obtener los creditos ${error}`);
    }

  }

  // metod para eliminar un credito
  eliminarcredito(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este credito?')) {

        this.creditosService.EliminarCredito(id).subscribe(
          () => {
            this.creditos = this.creditos.filter(credito => credito.id !== id)
            alert('creditos Eliminado Exitosamente')
          },
          (error) => {
            console.error('Error al eliminar credito:', error.message);
            alert('Error al eliminar la credito');
          }
        )
      }
    } catch (error) {
      console.error('Error al eliminar credito:', error);
      alert('Error al eliminar la credito');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/creditos/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/creditos/update/${id}`]);
  }
}
