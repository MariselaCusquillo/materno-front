import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('./profile/profile.module').then(m=>m.ProfileModule)},
  {path: 'cambiar-contrasena', loadChildren:()=> import('./change-password/change-password.module').then(m=>m.ChangePasswordModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
