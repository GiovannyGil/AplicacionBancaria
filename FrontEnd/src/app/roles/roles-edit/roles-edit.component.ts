import { Component } from '@angular/core';
import { RolesService } from '../roles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.css']
})
export class RolesEditComponent {
  id = 0; // ID del rol a editar (si es necesario)
  nombreRol : string = ''; // Nombre del rol
  descripcion : string = ''; // Descripción del rol
  estado : number = 1; // Estado por defecto (activo)

  constructor(
    private rolService: RolesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    // obtener el ID desde la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.cargarDatosRol(); // Solo carga los datos si el ID es válido
    } else {
      console.error('ID inválido para el rol');
    }
  }


  // metodo para obtener los datos existentes
  cargarDatosRol(): void {
    this.rolService.ObtenerRoleID(this.id).subscribe({
      next: (response) => {
        const rol = response // acceder a los datos

        // asignar los valores
        this.nombreRol = rol.nombreRol;
        this.descripcion = rol.descripcion;
        this.estado = rol.estado ? 1 : 0; // Convertir a número (1 o 0)
      },
      error: (error) => {
        console.error('Error al obtener el rol:', error.message);
      }
    });
  }

  // metodo para editar el rol
  actualizarRol(): void {
    const rolActualizado = {
      nombreRol: this.nombreRol,
      descripcion: this.descripcion,
      estado: this.estado // Convertir a booleano (true o false)
    }

    this.rolService.EditarRol(this.id, rolActualizado).subscribe({
      next: () => {
        alert('Rol actualizado exitosamente')
        this.router.navigate(['/roles'])
      }, 
      error: (error: { message: any; }) => {
        console.log(`Error al actualizar el rol ${error.message}`);
      }
    })
  }

}
