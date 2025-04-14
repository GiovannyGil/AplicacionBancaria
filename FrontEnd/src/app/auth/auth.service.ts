import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// interface -> tipo y respuesta
interface AuthResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'authToken';


  constructor(private http: HttpClient, private router: Router) { }

  // metodo login
  login(nombreUsuario: string, clave: string): Observable<AuthResponse> {
    try {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { nombreUsuario, clave }).pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token) // guardar el token en el localstorage
          console.log('token', response.token);

          // Decodificar el token para extraer el rol (si no usas una petición extra)
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          console.log('payload', payload);
          localStorage.setItem('rolId', payload.rol); // 👈 Guardar el rol en el localstorage

          this.programarCierreSesion() // programar el cierre de sesion
        })
      )
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      alert('Error al iniciar sesión')
      return new Observable<AuthResponse>() // retornar un observable vacio  
    }
  }

  // metodo registrarse
  register(primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string, nombreUsuario: string, correo: string, clave: string, direccion: string, celular: string, estado: boolean, genero: string, fechaCreacion: Date, rolId: number): Observable<AuthResponse> {
    try {
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        nombreUsuario,
        correo,
        clave,
        direccion,
        celular,
        estado,
        genero,
        fechaCreacion,
        rolId
      })
    } catch (error) {
      console.error('Error al registrarse', error)
      alert('Error al registrarse')
      return new Observable<AuthResponse>() // retornar un observable vacio  
    }
  }

  // metodo para cerrar session
  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem('rolId') // eliminar el rol del localstorage
      this.router.navigate(['/auth/login']) // redirigir al login
    } catch (error) {
      console.error('Error al cerrar sesión', error)
      alert('Error al cerrar sesión')
    }
  }

  // metodo obtener token
  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey)
    } catch (error) {
      console.error('Error al obtener el token', error)
      return null
    }
  }

  // metodo para obtener la fecha/tiempo de expiracion del token JWT
  private obtenerFechaExpiracion(): number | null {
    try {
      const token = this.getToken() // obtener el token
      if (!token) return null // si no hay token, retornar null

      const payload = JSON.parse(atob(token.split('.')[1])) // decodificar la carga util del token
      return payload.exp ? payload.exp * 1000 : null // convertir a milisegundos
    } catch (error) {
      console.error('Error al obtener la fecha de expiración', error)
      return null
    }
  }

  // metodo para programar cierre de sesion automatico
  private programarCierreSesion(): void {
    try {
      const fechaExpiracion = this.obtenerFechaExpiracion()
      if (!fechaExpiracion) return // si no hay fecha salir

      const tiempoRestante = fechaExpiracion - Date.now() // 
      if (tiempoRestante > 0) {
        setTimeout(() => {
          alert('El Token ha Expirado. Serás Redirigido al Inicio')
          this.logout()
        }, tiempoRestante)
      }
    } catch (error) {
      console.error('Error al programar el cierre de sesión', error)
      alert('Error al programar el cierre de sesión')
    }
  }

  // metodo para verificar si está logeoado
  async isLoggedIn(): Promise<boolean> {
    try {
      // verifica si el token actual es valido usando la fecha de expiración
      const fechaExpiracion = this.obtenerFechaExpiracion()
      return fechaExpiracion ? Date.now() < fechaExpiracion : false
    } catch (error) {
      console.error('Error al verificar el estado de sesión', error)
      return false
    }
  }

  // metodo para recordar usuario
  recordarUsuario(correo: string): Observable<any> {
    try {
      return this.http.post(`${this.apiUrl}/recuperarUsuario`, { correo });
    } catch (error) {
      console.error('Error al recordar usuario', error)
      alert('Error al recordar usuario')
      throw new Error('Error al recordar usuario')
    }
  }

  // metodo para reestablever la clave
  async reestablecerClave(nombreUsuario: string, correo: string, clave: string, confirmarClave: string) {
    try {
      return this.http.post(`${this.apiUrl}/reestablecerClave`, { nombreUsuario, correo, clave, confirmarClave }).pipe(
        tap((response) => {
          alert(response)
          console.log('Respuesta del servidor:', response)
          this.router.navigate(['/auth/login']) // redirigir al login
        })
      )
    } catch (error) {
      console.error('Error al reestablecer la clave', error)
      alert('Error al reestablecer la clave')
      throw new Error('Error al reestablecer la clave')
    }
  }
}
