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
      this.authService.login(this.nombreUsuario, this.clave).subscribe(
        () => {
          console.log('logeo existoso');
          this.router.navigate(['']) // redirigir al inicio despues del logeo
        },
        (error) => {
          console.error('Error al iniciar sesión ', error)
          alert('Error en las Credenciales')
        }
      )
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      alert('Error al iniciar sesión')
      throw new Error('Error al iniciar sesión')
    }
  }


  // metodo para ir de la pagina de login a la pagina de registro
  irARegistro(event: Event): void {
    try {
      event.preventDefault(); // Evita que el <a> recargue la página
      this.router.navigate(['/auth/register']) // redirigir al registro
    } catch (error) {
      console.error('Error al navegar a la página de registro', error)
      alert('Error al navegar a la página de registro')
      throw new Error('Error al navegar a la página de registro')
    }
  }

  // metodo para recordar clave


  // metodo para registrarse

}
