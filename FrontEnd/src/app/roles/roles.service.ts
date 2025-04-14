import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  // URL de la api modulo roles
  private apiURL = 'http://localhost:3000/roles'

  // inyectar metodos http/recursos
  constructor(private http: HttpClient) { }


  // Metodo para obtener todos los roles
  ObtenerRoles(): Observable<any> {
    const authToken = localStorage.getItem('authToken')

    // pasar el token al header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })

    // hacer el pedido a la api
    return this.http.get<any>(`${this.apiURL}`, { headers })
  }

    // Metodo para obtener todos los roles
    ObtenerRoleID(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')
  
      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
  
      // hacer el pedido a la api
      return this.http.get<any>(`${this.apiURL}/id/${id}`, { headers })
    }

    // Metodo para obtener todos los roles
    ObtenerRolesNombre(nombreRol: string): Observable<any> {
      const authToken = localStorage.getItem('authToken')
  
      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
  
      // hacer el pedido a la api
      return this.http.get<any>(`${this.apiURL}/${nombreRol}`, { headers })
    }

    // metodo para crear roles
    CrearRol(rol: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.post<any>(`${this.apiURL}`, rol, { headers })
    }

    // metodo para editar roles
    EditarRol(id: number, rol: any): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.patch<any>(`${this.apiURL}/update/${id}`, rol, { headers })
    }

    // metodo para eliminar roles
    EliminarRol(id: number): Observable<any> {
      const authToken = localStorage.getItem('authToken')

      // pasar el token al header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })

      return this.http.delete<any>(`${this.apiURL}/delete/${id}`, { headers })
    }
}
