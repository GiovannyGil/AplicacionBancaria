import { Component } from '@angular/core';
import { PerfilServicesService } from '../perfil-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
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
  estado: number = 1;
  genero: string = '';
  fechaCreacion: Date = new Date();
  rol: number = 2;

  constructor(
    private usuarioServide: PerfilServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 🔐 Leer el ID del usuario desde el localStorage
    const idGuardado = localStorage.getItem('usuarioId');
    if (idGuardado) {
      this.id = Number(idGuardado); // convertir a número
      this.cargarDatosUsuario(); // cargar los datos automáticamente
    } else {
      console.error('No se encontró el ID del usuario en el localStorage');
    }
  }

  cargarDatosUsuario(): void {
    this.usuarioServide.ObtenerUsuarioID(this.id).subscribe({
      next: (usuario) => {
        this.primerNombre = usuario.primerNombre;
        this.segundoNombre = usuario.segundoNombre;
        this.primerApellido = usuario.primerApellido;
        this.segundoApellido = usuario.segundoApellido;
        this.nombreUsuario = usuario.nombreUsuario;
        this.correo = usuario.correo;
        this.direccion = usuario.direccion;
        this.celular = usuario.celular;
        this.estado = usuario.estado;
        this.genero = usuario.genero;
        this.fechaCreacion = usuario.fechaCreacion;
        this.rol= usuario.rol.nombreRol;
      },
      error: (error) => {
        console.log(`Error al cargar los datos del usuario logueado ${error.message}`);
      },
      complete: () => {
        // Aquí puedes manejar la lógica después de cargar los datos del usuario
        console.log('Datos del usuario cargados correctamente');
      }
    });
  }


  // metodo para pasar los inputs de disabled a enabled
  editar(){
    const inputs = document.querySelectorAll('input, select, textarea, button');
    inputs.forEach((input) => {
      input.removeAttribute('disabled');
    });

    // boton con id = editar a hidden
    const botonEditar = document.getElementById('editar') as HTMLButtonElement;
    if (botonEditar) {
      botonEditar.style.display = 'none'; // Ocultar el botón de editar
    }

    // boton con id = hidden a visible
    const botonCancel = document.getElementById('cancel') as HTMLButtonElement;
    if (botonCancel) {
      botonCancel.style.display = 'block'; // Mostrar el botón de editar
    }
  }

  // metodo para cancelar editar
  cancelarEdit(){
    const inputs = document.querySelectorAll('input, select, textarea, button#actualizar');
    inputs.forEach((input) => {
      input.setAttribute('disabled', 'true');
    });

    // boton con id = editar a visible
    const botonEditar = document.getElementById('editar') as HTMLButtonElement;
    if (botonEditar) {
      botonEditar.style.display = 'block'; // Mostrar el botón de editar
      botonEditar.setAttribute('enabled', 'true'); // habilitar el boton
    }

    // boton con id = cancel a hidden
    const botonCancel = document.getElementById('cancel') as HTMLButtonElement;
    if (botonCancel) {
      botonCancel.style.display = 'none'; // Ocultar el botón de editar
    }
  }

  
  actualizarUsuario(): void {
    const usuarioActualizado = {
      primerNombre: this.primerNombre,
      segundoNombre: this.segundoNombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      nombreUsuario: this.nombreUsuario,
      correo: this.correo,
      direccion: this.direccion,
      celular: this.celular,
      estado: this.estado,
      genero: this.genero,
      fechaCreacion: this.fechaCreacion,
    };
    this.usuarioServide.ActualizarUsuario(this.id, usuarioActualizado).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/perfil']); // Redirigir a la página de perfil después de actualizar
        this.cancelarEdit(); // Cancelar la edición y volver a deshabilitar los campos
      },
      error: (error) => {
        console.log(`Error al actualizar el usuario ${error.message}`);
      },
      complete: () => {
        console.log('Usuario actualizado correctamente');
      }
  });
  }
  
}
