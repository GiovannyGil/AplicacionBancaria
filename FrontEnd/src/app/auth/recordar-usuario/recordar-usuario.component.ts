import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recordar-usuario',
  templateUrl: './recordar-usuario.component.html',
  styleUrls: ['./recordar-usuario.component.css']
})
export class RecordarUsuarioComponent {
  correo: string = ''
  usuarioEncontrado: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  recordarUsuario(): void {
    if (!this.correo) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    this.authService.recordarUsuario(this.correo).subscribe({
      next: (response) => {
        // Mostrar los datos que devuelve el backend
        alert(`Usuario: ${response.usuario}\nMensaje: ${response.message}`);

        // O puedes guardar el usuario en una variable y mostrarlo en el HTML
        this.usuarioEncontrado = response.usuario;

        // Opcional: redirigir luego de mostrar
        // this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error al recordar usuario', error);
        alert(error.error.message || 'Ocurrió un error al recordar el usuario.');
      }
    });
  }


}
