import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
  private renderer: Renderer2, @Inject(DOCUMENT) private document: Document
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar jQuery dinámicamente
    const jqueryScript = this.renderer.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.onload = () => {
      this.loadLoginScript(); // Cargar login.js después de que jQuery esté disponible
    };
    this.renderer.appendChild(this.document.body, jqueryScript);
  }
  //script de formulario personalizado
  loadLoginScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/login.js';
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }

  onSubmit(): void {
    console.log('boton accionado')
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
          (response) => {
            this.router.navigate(['/']);
            console.log('Usuario autenticado:', response)
          },
          (error) => {
            this.errorMessage = 'Error, verifica tu contraseña e email';
            console.error('Error en autenticación:', error)

          },
        );
      }else{
        this.errorMessage = 'Por favor, completa todos los campos correctamente.';
        console.log('Error al logearse')
      }
  }
}
