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
  rolId: number = 2;

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
    this.usuarioServide.ObtenerUsuarioID(this.id).subscribe(
      (usuario) => {
        console.log('Datos Obtenidos PERFIL', usuario);

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
      (error) => {
        console.log(`Error al cargar los datos ${error.message}`);
      }
    );
  }

  /** 
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
    };

    console.log('Datos a enviar ', usuarioActualizado);

    this.usuarioServide.ActualizarUsuario(this.id, usuarioActualizado).subscribe(
      () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        console.log(`Error al actualizar el usuario ${error.message}`);
      }
    );
  }
  */
}
