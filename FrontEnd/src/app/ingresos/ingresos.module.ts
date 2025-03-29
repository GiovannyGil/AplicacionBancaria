import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { IngresosCreateComponent } from './ingresos-create/ingresos-create.component';
import { IngresosListComponent } from './ingresos-list/ingresos-list.component';
import { IngresosEditComponent } from './ingresos-edit/ingresos-edit.component';


@NgModule({
  declarations: [
    IngresosCreateComponent,
    IngresosListComponent,
    IngresosEditComponent
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule
  ]
})
export class IngresosModule { }
