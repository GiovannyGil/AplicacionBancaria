import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresosListComponent } from './ingresos-list/ingresos-list.component';
import { IngresosCreateComponent } from './ingresos-create/ingresos-create.component';
import { IngresosEditComponent } from './ingresos-edit/ingresos-edit.component';

const routes: Routes = [
  { path: '', component: IngresosListComponent }, // Redirige a la lista de ingreso por defecto
  { path: 'crear', component: IngresosCreateComponent }, // Ruta para crear un nuevo ingreso
  { path: 'update/:id', component: IngresosEditComponent } // Ruta para editar un ingreso existente
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule { }
