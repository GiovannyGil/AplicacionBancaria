import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PerfilServicesService {

  // URL de la api modulo usuarios
  private apiURL = 'http://localhost:3000/usuarios'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }
  

  // metodo para obtener usuarios por id
  ObtenerUsuarioID(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
  }

  // metodo para actualizar
  ActualizarUsuario(id: number, usuario: any): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.patch<any>(`${this.apiURL}/update/${id}`, usuario, { headers })
  }
}
