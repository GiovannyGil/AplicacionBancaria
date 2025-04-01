import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetasRoutingModule } from './tarjetas-routing.module';
import { TarjetasCreateComponent } from './tarjetas-create/tarjetas-create.component';
import { TarjetasListComponent } from './tarjetas-list/tarjetas-list.component';
import { TarjetasEditComponent } from './tarjetas-edit/tarjetas-edit.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TarjetasCreateComponent,
    TarjetasListComponent,
    TarjetasEditComponent
  ],
  imports: [
    CommonModule,
    TarjetasRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class TarjetasModule { }
