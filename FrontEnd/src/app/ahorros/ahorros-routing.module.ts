import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorrosListComponent } from './ahorros-list/ahorros-list.component';
import { AhorrosCreateComponent } from './ahorros-create/ahorros-create.component';
import { AhorrosEditComponent } from './ahorros-edit/ahorros-edit.component';

const routes: Routes = [
  { path: '', component: AhorrosListComponent }, // Redirige a la lista de ahorros por defecto
  { path: 'crear', component: AhorrosCreateComponent }, // Ruta para crear un nuevo ahorro
  { path: 'update/:id', component: AhorrosEditComponent } // Ruta para editar un ahorro existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorrosRoutingModule { }
