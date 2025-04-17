import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
