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
        // alert(`
        //   ${response.message}\n
        //   Usuario: ${response.usuario}
        // `)

        this.usuarioEncontrado = response.usuario; // Guardar el usuario encontrado
      },
      error: (error) => {
        console.error('Error al recordar usuario', error);
        alert(error.error.message || 'Ocurrió un error al recordar el usuario.');
      }
    });
  }


}
