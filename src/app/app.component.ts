import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../../backend/auth.service';
import { AppRoutingModule, routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, NavbarComponent], // Solo importar lo necesario
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet> `, // Uso directo de la plantilla
  styleUrls: ['./app.component.css'], // Asegúrate de que la referencia a la hoja de estilo sea correcta
  providers: [AuthService, AppRoutingModule]
})

export class AppComponent {
  title = 'mean-login';

}
