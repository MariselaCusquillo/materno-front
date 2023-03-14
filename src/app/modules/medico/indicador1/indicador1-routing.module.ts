import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Indicador1Component } from './indicador1.component';

const routes: Routes = [
  {path: '', component: Indicador1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Indicador1RoutingModule { }