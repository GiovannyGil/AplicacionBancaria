import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent {
  id!: number; // ID del usuario a editar
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
  rolId: number = 2; // ID del rol por defecto (rol usuario)

  constructor(
    private usuarioServide: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID obtenido: ', this.id);
    if (this.id) {
      this.cargarDatosUsuario(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el usuario');
    }
  }

  // metodo para cargar los datos existentes}
  cargarDatosUsuario(): void {
    this.usuarioServide.ObtenerUsuarios(this.id).subscribe(
      (response: { usuario: any; }) => {
        console.log('Datos Obtenidos', response);
        const usuario = response.usuario // acceder a los datos

        // asignar los valores
        this.primerNombre = usuario.primerNombre;
        this.segundoNombre = usuario.segundoNombre;
        this.primerApellido = usuario.primerApellido;
        this.segundoApellido = usuario.segundoApellido;
        this.nombreUsuario = usuario.nombreUsuario;
        this.correo = usuario.correo;
        this.clave = usuario.clave;
        this.direccion = usuario.direccion;
        this.celular = usuario.celular;
        this.estado = usuario.estado;
        this.genero = usuario.genero;
        this.rolId = usuario.rolId;
      }, (error: { message: any; }) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    )
  }

  // metodo para actulizar
  actualizarUsuario(): void {
    const usuarioActualizado = {
      primerNombre: this.primerNombre,
      segundoNombre: this.segundoNombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      nombreUsuario: this.nombreUsuario,
      correo: this.correo,
      clave: this.clave,
      direccion: this.direccion,
      celular: this.celular,
      estado: this.estado,
      rolId: this.rolId
    }

    console.log('Datos a enviar ',usuarioActualizado);

    this.usuarioServide.ActualizarUsuario(this.id, usuarioActualizado).subscribe(
      () => {
        alert('Usuario actualizado exitosamente')
        this.router.navigate(['/usuarios'])
      }, 
      (error: { message: any; }) => {
        console.log(`Error al actualizar el usuario ${error.message}`);
      }
    )
  }

}
