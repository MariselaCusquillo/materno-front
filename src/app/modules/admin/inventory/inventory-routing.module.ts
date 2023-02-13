import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'usuarios', loadChildren: ()=> import('./usuarios/usuarios.module').then(m=>m.UsuariosModule)},
  {path:'establecimientos', loadChildren: ()=> import('./establecimientos/establecimientos.module').then(m=>m.EstablecimientosModule)},
  //{path:'establecimiento', loadChildren: ()=> import('./establecimiento/establecimiento.module').then(m=>m.EstablecimientoModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
