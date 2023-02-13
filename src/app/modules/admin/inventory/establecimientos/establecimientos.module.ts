import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EstablecimientosRoutingModule } from './establecimientos-routing.module';
import { EstablecimientosComponent } from './establecimientos.component';
import { NewEstablecimientosComponent } from './new-establecimientos/new-establecimientos.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { EditEstablecimientosComponent } from './edit-establecimientos/edit-establecimientos.component';


@NgModule({
  declarations: [

    EstablecimientosComponent,
    NewEstablecimientosComponent,
    EditEstablecimientosComponent
    
  ],
  imports: [
    CommonModule,
    EstablecimientosRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class EstablecimientosModule { }
