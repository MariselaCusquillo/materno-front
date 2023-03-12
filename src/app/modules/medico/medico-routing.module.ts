import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../../guards/no-auth.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { LayoutComponent } from 'src/app/layouts/layout.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('../admin/auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path: 'private',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home', loadChildren: ()=> import('./home/home.module').then(m=>m.HomeModule)},
      {path:'**', pathMatch:'full',loadChildren:()=> import('./error404/error404.module').then(m=>m.Error404Module)},
    ]
  },
  {path:'', redirectTo:'',pathMatch:'full'},
  {path:'**', redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
