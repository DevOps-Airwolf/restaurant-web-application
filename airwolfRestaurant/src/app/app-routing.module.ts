import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"menu",component:MenuBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
