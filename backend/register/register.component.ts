import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
  private renderer: Renderer2, @Inject(DOCUMENT) private document: Document
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['/']);
          console.log('Usuario autenticado:', response)
        },
        (error) => {
          this.errorMessage = 'El usuario ingresado no existe, verifica tu contraseña e email';
          console.error('Error en autenticación:', error)

        },
      );
    }else{
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
