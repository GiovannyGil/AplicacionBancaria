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
  reestablecerClave(): void {
    if (this.clave !== this.confirmarClave) {
      alert('Las contraseñas no coinciden. Por favor, intente nuevamente.');
      return;
    }

    this.authService.reestablecerClave(this.nombreUsuario, this.correo, this.clave, this.confirmarClave).subscribe({
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
