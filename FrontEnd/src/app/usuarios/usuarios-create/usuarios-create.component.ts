import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent {
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  clave: string = '';
  direccion: string = '';
  celular: string = '';
  estado: number = 1; // Estado por defecto (activo)
  genero: string = '';
  fechaCreacion: Date = new Date(); // Fecha de creación por defecto (actual)

  rolId: number = 2; // ID del rol por defecto (rol usuario)

  constructor (private usuarioService: UsuariosService, private router: Router) {}

  // metodo para crear usuarios
  crearUsuario(): void {
    const nuevoUsuario = {
      primerNombre: this.primerNombre,
      segundoNombre: this.segundoNombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      nombreUsuario: this.nombreUsuario,
      correo: this.correo,
      clave: this.clave,
      direccion: this.direccion,
      celular: this.celular,
      estado: Boolean(this.estado),
      genero: this.genero,
      fechaCreacion: this.fechaCreacion,
      rolId: this.rolId
    }

    this.usuarioService.CrearUsuarios(nuevoUsuario).subscribe(
      () => {
        alert('Usuario creado exitosamente')
        this.router.navigate(['/usuarios'])

      }, (error: { message: any; }) => {
        console.log(`Error al crear el usuario ${error.message}`);
      }
    )
  }

}
