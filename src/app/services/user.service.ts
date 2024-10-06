
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; 
  private apiUrl2 = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers }); 
  }

  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }

  changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  

    return this.http.put(`${this.apiUrl2}/change-password`, 
      { 
        current_password: currentPassword, 
        new_password: newPassword, 
        new_password_confirmation: newPasswordConfirmation 
      },
      { headers }
    );
  }
}