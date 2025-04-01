import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditosListComponent } from './creditos-list/creditos-list.component';
import { CreditosCreateComponent } from './creditos-create/creditos-create.component';
import { CreditosEditComponent } from './creditos-edit/creditos-edit.component';

const routes: Routes = [
  { path: '', component: CreditosListComponent }, // Redirige a la lista de credito por defecto
  { path: 'crear', component: CreditosCreateComponent }, // Ruta para crear un nuevo credito
  { path: 'update/id', component: CreditosEditComponent } // Ruta para editar un credito existente
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
