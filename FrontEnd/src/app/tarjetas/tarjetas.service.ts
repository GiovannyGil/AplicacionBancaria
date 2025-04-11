import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  // URL de la api modulo tarjetas
  private apiURL = 'http://localhost:3000/api/tarjetas'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los tarejta
  ObtenerTarjetas(): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

  // Metodo para obtener todos los tarejta
  ObtenerTarjetaID(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
  }

  // metodo para crear tarejta
  CrearTarjeta(tarjeta: any): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.post<any>(`${this.apiURL}`, tarjeta, { headers })
  }

  // metodo para editar tarjeta
  EditarTarjeta(id: number, tarjeta: any): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.put<any>(`${this.apiURL}/update/${id}`, tarjeta, { headers })
  }

  // metodo para eliminar tarjeta
  EliminarTarjeta(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.delete<void>(`${this.apiURL}/id/${id}`, { headers })
  }
}
