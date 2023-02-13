import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


import { EditUsuariosComponent } from './edit-usuarios/edit-usuarios.component';



@NgModule({
  declarations: [

    UsuariosComponent,
    EditUsuariosComponent,
    
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class UsuariosModule { }
