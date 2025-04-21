import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  constructor(private authService: AuthService, private router: Router) { }

  // Método para registrar un nuevo usuario
  register(): void {
    try {
      if (
        this.primerNombre &&
        this.segundoNombre &&
        this.primerApellido &&
        this.segundoApellido &&
        this.nombreUsuario &&
        this.correo &&
        this.clave &&
        this.direccion &&
        this.celular &&
        this.genero
      ) {
        // Llamar al servicio de autenticación para registrar el usuario
        this.authService.register(
          this.primerNombre,
          this.segundoNombre,
          this.primerApellido,
          this.segundoApellido,
          this.nombreUsuario,
          this.correo,
          this.clave,
          this.direccion,
          this.celular,
          Boolean(this.estado),
          this.genero,
          this.fechaCreacion,
          this.rolId
      ).subscribe({
          next: () => {
            alert('Registro exitoso');
            this.router.navigate(['/auth/login']);
          },
          error: (error: { message: any; }) => {
            console.error('Error en el registro', error.message);
            alert('Error al registrarse');
          }
        });
      } else {
        alert('Por favor, completa todos los campos');
      }
    } catch (error) {
      console.error('Error al registrar', error);
      alert('Error al registrar');  
    }
  }
}
