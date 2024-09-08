import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../../backend/register/register.component';
import { LoginComponent } from '../../backend/login/login.component';
import { HomeComponent } from '../../backend/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecciona a /register si la ruta es vacía
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
