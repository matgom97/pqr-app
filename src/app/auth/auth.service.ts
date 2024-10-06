import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Guarda el token y el rol en localStorage
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({ 
              name: response.user.name,
              email: response.user.email,
              role: response.user.role // Guarda el rol también
            })); 
          }
          console.log('Token guardado en localStorage:', response.token);
        } else {
          console.error('Token no encontrado en la respuesta:', response);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Asegúrate de que tu token se guarde en el localStorage
      localStorage.removeItem('user'); // Opcional: también puedes eliminar el usuario al cerrar sesión
    }
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
  const token = localStorage.getItem('token'); // Obtén el token de localStorage
  const headers = {
    'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
    'Content-Type': 'application/json'
  };

  return this.http.post(`${this.apiUrl}/change-password`, 
    { current_password: currentPassword, new_password: newPassword },
    { headers }
  );
}

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log(parsedUser.role)
        return parsedUser.role === 'admin'; // Comprueba si el rol es 'admin'
      }
    }
    return false; // Retorna false si no hay usuario o no tiene rol admin
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token'); // Retorna true si hay un token en el localStorage
    }
    return false;
  }
}