// src/app/nav-bar/nav-bar.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [ReactiveFormsModule, CommonModule,    RouterModule ],
})
export class NavBarComponent {
  isAdmin: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.isAdmin(); // Método para verificar si el usuario es admin
    console.log(this.isAdmin)
  }

  

  logout() {
    this.authService.logout(); // Llama al método logout
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}