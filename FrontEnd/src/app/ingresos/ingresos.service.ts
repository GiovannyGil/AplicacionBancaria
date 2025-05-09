import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  // URL de la api modulo ingreso
  private apiURL = 'http://localhost:3000/Ingresos'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }


// Metodo para obtener todos los Ingreso
  ObtenerIngresoes(): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

    // Metodo para obtener todos los Ingreso
    ObtenerIngresoeID(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')
  
      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
  
      // hacer el pedido a la api
      return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
    }

    // metodo para crear Ingreso
    CrearIngreso(Ingreso: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.post<any>(`${this.apiURL}`, Ingreso, { headers })
    }

    // metodo para editar Ingreso
    EditarIngreso(id: number, Ingreso: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.patch<any>(`${this.apiURL}/update/${id}`, Ingreso, { headers })
    }

    // metodo para eliminar Ingreso
    EliminarIngreso(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.delete<void>(`${this.apiURL}/delete/${id}`, { headers })
    }
}
