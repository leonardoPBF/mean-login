import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { of } from 'rxjs';

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
      password: ['', Validators.required,],
      confirmPassword: ['', Validators.required]
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

    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if(password == confirmPassword){
      if (this.registerForm.valid) {

        this.authService.register(this.registerForm.value).subscribe(
          (response) => {
            console.log('Usuario creado:', response)
            this.successMessage = 'Usuario creado correctamente';
          },
          (error) => {
            this.errorMessage = 'Es posible que el usuario ya este registrado, prueba con otro correo';
            console.error('Error en autenticación:', error)
          },
        );
      }else{
        this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      }
    }else{
      console.log('las contraseñas no coinciden')
      this.errorMessage = 'Contraseñas no coinciden';
    }
  }
}
