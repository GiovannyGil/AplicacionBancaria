import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent {
  // iconos -> fontawesome
  faEdit = faEdit
  faTrash = faTrash
  faPlus = faPlus

  // instanciar array de usuarios vacio por defecto []
  usuarios : any[] = []

  // inyectar servicio
  constructor(private usuarioService: UsuariosService, private router: Router) {}


  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  // metodo para obtener ususarios
  obtenerUsuarios(): void {
    try {
      this.usuarioService.ObtenerUsuarios().subscribe({
        next: (data) => {
          this.usuarios = data // obtener un array de usuarios que trae el objeto
        },
        error: (error) => {
          if(error.status === 401){
            console.error(`Token no encontrado, debe iniciar sesión ${error.message}`)
          } else {
            console.error(`Error al obtener los usuarios ${error.message}`)
          }
        }
      })
    } catch (error) {
      console.log(`Error al Obtener los Usuarios ${error}`);
    }

  }
  // metod para eliminar un usuario
  eliminarUsuario(id: number): void {
    try {
      if (confirm('¿Está seguto que desea eliminar este usuario?')) {

        this.usuarioService.EliminarUsuairo(id).subscribe({
          next: () => {
            alert('Usuario Eliminado Exitosamente');
            this.obtenerUsuarios();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error.message);
            alert('Error al eliminar la usuario');
          }
        })
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar la usuario');
    }
  }


  // ir al formulario crear
  FomularioCrear(): void {
    this.router.navigate(['/usuarios/crear'])
  }

  // ir al formulario editar
  FormularioEditar(id: number): void {
    this.router.navigate([`/usuarios/update/${id}`]);
  }
}
