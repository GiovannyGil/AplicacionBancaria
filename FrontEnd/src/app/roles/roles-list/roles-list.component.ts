import { Component } from '@angular/core';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de roles vacio por defecto []
  roles: any[] = []

  // inyectar servicio
  constructor(private router: Router, private rolServices: RolesService) { }

  ngOnInit(): void {
    this.obtenerRoles()
  }


  // metodo para obtener roles
  obtenerRoles(): void {
    try {
      this.rolServices.ObtenerRoles().subscribe({
        next: (data) => {
          this.roles = data // obtener un array de roles que trae el 
        },
        error: (error) => {
          if (error.status === 401) {
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los roles ${error.message}`)
          }
        }
      })
    } catch (error) {
      console.log(`Error al Obtener los Roles ${error}`);
    }
  }

  // metodo para eliminar un rol
  eliminarRol(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este rol?')) {

        this.rolServices.EliminarRol(id).subscribe({
          next: () => {
            this.roles = this.roles.filter(rol => rol.id !== id)
            alert('Rol Eliminado Exitosamente')
          },
          error: (error) => {
            console.error('Error al eliminar rol:', error.message);
            alert('Error al eliminar el rol');
          }
        })
      }
    } catch (error) {
      console.error(`Error al eliminar el rol ${error}`)
    }
  }

  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/roles/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/roles/update/${id}`]);
  }
}
