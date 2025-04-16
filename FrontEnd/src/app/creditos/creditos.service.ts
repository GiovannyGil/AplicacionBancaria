import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  // URL de la api modulo Creditos
  private apiURL = 'http://localhost:3000/creditos'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los tarejta
  ObtenerCreditos(): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

    // Metodo para obtener todos los tarejta
    ObtenerCreditoID(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')
  
      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
  
      // hacer el pedido a la api
      return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
    }

    // metodo para crear tarejta
    CrearCredito(credito: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.post<any>(`${this.apiURL}`, credito, { headers })
    }

    // metodo para editar Credito
    EditarCredito(id: number, credito: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.patch<any>(`${this.apiURL}/update/${id}`, credito, { headers })
    }

    // metodo para eliminar Credito
    EliminarCredito(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.delete<void>(`${this.apiURL}/delete/${id}`, { headers })
    }
}
