import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosCreateComponent } from './gastos-create/gastos-create.component';
import { GastosEditComponent } from './gastos-edit/gastos-edit.component';
import { GastosListComponent } from './gastos-list/gastos-list.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GastosCreateComponent,
    GastosEditComponent,
    GastosListComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class GastosModule { }
