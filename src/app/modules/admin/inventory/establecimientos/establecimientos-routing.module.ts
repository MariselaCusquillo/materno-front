import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EstablecimientosComponent } from './establecimientos.component';

const routes: Routes = [
  {path:'', component:EstablecimientosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
