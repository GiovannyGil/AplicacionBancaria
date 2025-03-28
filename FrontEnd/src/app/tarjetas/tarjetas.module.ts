import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetasRoutingModule } from './tarjetas-routing.module';
import { TarjetasCreateComponent } from './tarjetas-create/tarjetas-create.component';
import { TarjetasListComponent } from './tarjetas-list/tarjetas-list.component';
import { TarjetasEditComponent } from './tarjetas-edit/tarjetas-edit.component';


@NgModule({
  declarations: [
    TarjetasCreateComponent,
    TarjetasListComponent,
    TarjetasEditComponent
  ],
  imports: [
    CommonModule,
    TarjetasRoutingModule
  ]
})
export class TarjetasModule { }
