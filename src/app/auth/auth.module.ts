import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule aquí
    RouterModule // Para las rutas
  ]
})
export class AuthModule {}