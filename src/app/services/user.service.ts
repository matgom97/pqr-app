// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; 
  private apiUrl2 = 'http://localhost:8000/api'; // Ajusta esto según tu API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers }); // Envía el token en el encabezado
  }

  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }

  changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token de localStorage
    const headers = {
      'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
      'Content-Type': 'application/json'
    };
  
    // Envía la solicitud con todos los parámetros necesarios
    return this.http.put(`${this.apiUrl2}/change-password`, 
      { 
        current_password: currentPassword, 
        new_password: newPassword, 
        new_password_confirmation: newPasswordConfirmation // Asegúrate de incluir esto
      },
      { headers }
    );
  }
}