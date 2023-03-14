import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Indicador1RoutingModule } from './indicador1-routing.module';
import { Indicador1Component } from './indicador1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Indicador1Component
  ],
  imports: [
    CommonModule,
    Indicador1RoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class Indicador1Module { }
