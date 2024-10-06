import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 


  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());


  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedInSubject.next(this.isLoggedIn());
      this.isAdminSubject.next(this.isAdmin());
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({
              name: response.user.name,
              email: response.user.email,
              role: response.user.role 
            }));
          }

          this.isLoggedInSubject.next(true);
          this.isAdminSubject.next(response.user.role === 'admin');
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
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
      this.isLoggedInSubject.next(false); 
      this.isAdminSubject.next(false);
    }
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = {
      'Authorization': `Bearer ${token}`, 
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
        return parsedUser.role === 'admin'; 
      }
    }
    return false; 
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token'); 
    }
    return false;
  }
}