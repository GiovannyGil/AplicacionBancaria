import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosListComponent } from './gastos-list/gastos-list.component';
import { GastosCreateComponent } from './gastos-create/gastos-create.component';
import { GastosEditComponent } from './gastos-edit/gastos-edit.component';

const routes: Routes = [
  { path: '', component: GastosListComponent }, // Redirige a la lista de gasto por defecto
  { path: 'crear', component: GastosCreateComponent }, // Ruta para crear un nuevo gasto
  { path: 'update/id', component: GastosEditComponent } // Ruta para editar un gasto existente
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }
