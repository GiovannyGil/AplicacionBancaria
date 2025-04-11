import { Component } from '@angular/core';
import { RolesService } from '../roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.css']
})
export class RolesCreateComponent {
  nombreRol : string = ''; // Nombre del rol
  descripcion : string = ''; // Descripción del rol
  estado : number = 1; // Estado por defecto (activo)

  constructor(
    private rolService: RolesService,
    private router: Router
  ) {}

  // metodo para crear roles
  crearRol(): void {
    const nuevoRol = {
      nombreRol: this.nombreRol,
      descripcion: this.descripcion,
      estado: Boolean(this.estado)
    }

    this.rolService.CrearRol(nuevoRol).subscribe(
      () => {
        alert('Rol creado exitosamente')
        this.router.navigate(['/roles'])
      }, (error: { message: any; }) => {
        console.log(`Error al crear el rol ${error.message}`);
      }
    )
  }
}
