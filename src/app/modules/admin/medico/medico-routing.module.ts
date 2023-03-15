import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'indicadores', loadChildren: ()=> import('./pages/indicadores/indicadores.module').then(m=>m.IndicadoresModule)},
  {path:'indicador1', loadChildren: ()=> import('./pages/indicador1/indicador1.module').then(m=>m.Indicador1Module)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
