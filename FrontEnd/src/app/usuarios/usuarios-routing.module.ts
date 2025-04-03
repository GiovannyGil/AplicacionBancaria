import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component';

const routes: Routes = [
  { path: '', component: UsuariosListComponent }, // Redirige a la lista de usuarios por defecto
  { path: 'crear', component: UsuariosCreateComponent }, // Ruta para crear un nuevo usuario
  { path: 'update/:id', component: UsuariosEditComponent } // Ruta para editar un usuario existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
