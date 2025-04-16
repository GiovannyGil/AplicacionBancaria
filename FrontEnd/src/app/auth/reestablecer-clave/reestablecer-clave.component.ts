import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reestablecer-clave',
  templateUrl: './reestablecer-clave.component.html',
  styleUrls: ['./reestablecer-clave.component.css']
})
export class ReestablecerClaveComponent {
  nombreUsuario: string = ''
  correo: string = ''
  clave: string = ''
  confirmarClave: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  // metodo para reestablecer la clave
  reestablecerClave(nombreUsuario: string, correo: string, clave: string, confirmarClave: string): void {
    if (clave !== confirmarClave) {
      alert('Las contraseñas no coinciden. Por favor, intente nuevamente.');
      return;
    }

    this.authService.reestablecerClave(nombreUsuario, correo, clave, confirmarClave).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        console.error('Error al reestablecer la clave', error);
        alert(error.error.message || 'Ocurrió un error al reestablecer la clave.');
      }
    });
  }
}
