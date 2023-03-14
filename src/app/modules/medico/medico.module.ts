import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { LayoutModule } from 'src/app/layouts/layout.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    LayoutModule
  ]
}) 
export class MedicoModule {
}
