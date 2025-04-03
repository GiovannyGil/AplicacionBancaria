import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';

const routes: Routes = [
  { path: '', component: RolesListComponent },
  { path: 'crear', component: RolesCreateComponent }, // Ruta para crear
  { path: 'update/:id', component: RolesEditComponent } // Ruta para editar con parámetro ID
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
