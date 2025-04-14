import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { IngresosCreateComponent } from './ingresos-create/ingresos-create.component';
import { IngresosListComponent } from './ingresos-list/ingresos-list.component';
import { IngresosEditComponent } from './ingresos-edit/ingresos-edit.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    IngresosCreateComponent,
    IngresosListComponent,
    IngresosEditComponent
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class IngresosModule { }
