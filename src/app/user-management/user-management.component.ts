// src/app/user-management/user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { AuthService } from '../auth/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule] // Asegúrate de importar CommonModule aquí
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin(); 

    console.log("al listar usuarios es: ",this.isAdmin)
    if (this.isAdmin) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers(); 
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}