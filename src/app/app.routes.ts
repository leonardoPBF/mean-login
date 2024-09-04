import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../../backend/register/register.component';
import { LoginComponent } from '../../backend/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirecciona a /register si la ruta es vacía
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
