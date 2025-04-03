import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  // URL de la api modulo Gastos
  private apiURL = 'http://localhost:3000/api/gastos'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }


  // Metodo para obtener todos los tarejta
  ObtenerGastos(): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

    // Metodo para obtener todos los tarejta
    ObtenerGastoID(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')
  
      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
  
      // hacer el pedido a la api
      return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
    }

    // metodo para crear tarejta
    CrearGasto(gasto: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.post<any>(`${this.apiURL}`, gasto, { headers })
    }

    // metodo para editar Gasto
    EditarGasto(id: number, gasto: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.put<any>(`${this.apiURL}/update/${id}`, gasto, { headers })
    }

    // metodo para eliminar Gasto
    EliminarGasto(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.delete<void>(`${this.apiURL}/id/${id}`, { headers })
    }
}
