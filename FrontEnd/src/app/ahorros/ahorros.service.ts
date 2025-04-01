import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AhorrosService {
  // URL de la api modulo usuarios
  private apiURL = 'http://localhost:3000/api/ahorros'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }


  // Metodo para obtener todos los ahorros
  ObtenerAhorros(): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

  // metodo para obtener ahorros por id
  ObtenerAhorrosID(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
  }
  // metodo para crear un ahorro
  CrearAhorro(ahorro: any): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.post<any>(`${this.apiURL}`, ahorro, { headers })
  }

  // metodo para actualizar un ahorro
  // metodo para actualizar
  ActualizarAhorro(id: number, ahorro: any): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.patch<any>(`${this.apiURL}/update/${id}`, ahorro, { headers })
  }

  // metodo para eliminar un ahorro
  EliminarAhorro(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.delete<any>(`${this.apiURL}/delete/${id}`, { headers })
  }

  // metodo para eliminar definitivamente un ahorro
  EliminarAhorroDefinitive(id: number): Observable<any> {
    const authToken = localStorage.getItem('authToken') // obtener el token del localstorage

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    return this.http.delete<any>(`${this.apiURL}/removedefinitive/${id}`, { headers })
  }
}
