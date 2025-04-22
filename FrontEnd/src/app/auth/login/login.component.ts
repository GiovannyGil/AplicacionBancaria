import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombreUsuario: string = ''
  clave: string = ''

  constructor(private authService: AuthService, private router: Router) { }


  // metodo para logearse
  async login(): Promise<void> {
    try {
      this.authService.login(this.nombreUsuario, this.clave).subscribe({
        next: () => {
          alert('logueo existoso');
          this.router.navigate(['inicio']) // redirigir al inicio despues del logue
        },
        error: (error) => {
          console.error('Error al iniciar sesión ', error)
          alert('Error en las Credenciales')
        }
      })
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      alert('Error al iniciar sesión')
      throw new Error('Error al iniciar sesión')
    }
  }
}
