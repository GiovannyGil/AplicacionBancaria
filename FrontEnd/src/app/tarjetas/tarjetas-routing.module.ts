import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetasListComponent } from './tarjetas-list/tarjetas-list.component';
import { TarjetasCreateComponent } from './tarjetas-create/tarjetas-create.component';
import { TarjetasEditComponent } from './tarjetas-edit/tarjetas-edit.component';

const routes: Routes = [
  { path: '', component: TarjetasListComponent }, // Redirige a la lista de tarjeta por defecto
  { path: 'crear', component: TarjetasCreateComponent }, // Ruta para crear un nuevo tarjeta
  { path: 'update/:id', component: TarjetasEditComponent } // Ruta para editar un tarjeta existente
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetasRoutingModule { }
