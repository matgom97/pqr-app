import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Ajusta la ruta según tu estructura de archivos
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports:[FormsModule, CommonModule]
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  newPasswordConfirmation: string = ''; // Asegúrate de que esta propiedad esté declarada
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  changePassword() {
    this.userService.changePassword(this.currentPassword, this.newPassword, this.newPasswordConfirmation).subscribe(
      (response) => {
        this.successMessage = 'Contraseña cambiada con éxito.';
        // Resetear campos
        this.currentPassword = '';
        this.newPassword = '';
        this.newPasswordConfirmation = '';
      },
      (error) => {
        // Manejar el error
        if (error.error.message) {
          this.errorMessage = error.error.message; // Mostrar el mensaje de error específico
        } else {
          this.errorMessage = 'Error al cambiar la contraseña. Por favor, inténtelo de nuevo.';
        }
      }
    );
  }
}