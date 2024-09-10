import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule para usar routerLink
import { AuthService } from '../../../backend/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Asegúrate de importar RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

}
