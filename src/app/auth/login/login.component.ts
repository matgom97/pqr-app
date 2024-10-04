import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Inyección de plataforma
  ) {}

  ngOnInit(): void {
    console.log("LoginComponent initialized");
  
    // Inicializa el formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    console.log("Formulario de inicio de sesión creado", this.loginForm);

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log("Token en localStorage:", token); // Para depuración
      if (token) {
        this.router.navigate(['/pqrs']); // Redirige si el token existe
      }
    } else {
      console.log("no pasa nada");
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/pqr']);
        },
        error: (error) => {
          console.error('Error de inicio de sesión', error);
        },
      });
    }
  }
}