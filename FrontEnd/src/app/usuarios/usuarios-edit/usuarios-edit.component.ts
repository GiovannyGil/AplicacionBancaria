import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent {
  id!: number;
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
  rolId: number = 2; // ID del rol por defecto (puede ser un valor fijo o dinámico según tu lógica)


  constructor(
    private usuarioServide: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.cargarDatosUsuario(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el usuario');
    }
  }


  // metodo para cargar los datos existentes}
  cargarDatosUsuario(): void {

    this.usuarioServide.ObtenerUsuarioID(this.id).subscribe({
      next: (response) => {
        const usuario = response // acceder a los datos

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
        this.fechaCreacion = usuario.fechaCreacion;
        this.rolId = usuario.rolId;
      }, 
      error: (error) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    })
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
      genero: this.genero,
      fechaCreacion: this.fechaCreacion,
      rolId: this.rolId,
    }
    this.usuarioServide.ActualizarUsuario(this.id, usuarioActualizado).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente')
        this.router.navigate(['/usuarios'])
      },
      error: (error) => {
        console.log(`Error al actualizar el usuario ${error.message}`);
      }
    })
  }

}
