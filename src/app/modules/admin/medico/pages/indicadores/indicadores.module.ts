import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { IndicadoresComponent } from './indicadores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndicadoresComponent
  ],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IndicadoresModule { }
