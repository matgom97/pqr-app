import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PqrResponse } from '../models/pqr-response.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class PqrService {
  private baseUrl = 'http://localhost:8000/api'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient) { }

  // Método para obtener los encabezados de autorización
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // O sessionStorage, según cómo lo hayas almacenado

    console.log("Token:", token); // Verifica el valor del token

    // Si no hay token, retorna un objeto vacío
    if (!token) {
      return {}; // O puedes devolver un objeto de encabezados vacío
    }

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Método para crear un nuevo PQR
  createPqr(pqrData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pqr`, pqrData, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener la lista de PQRS con filtros y paginación
  getPqrs(fecha?: string, tipo?: string, page: number = 1, perPage: number = 10): Observable<PqrResponse> {
    let params = `?page=${page}&per_page=${perPage}`;
    if (fecha) {
      params += `&fecha_incidencia=${fecha}`;
    }
    if (tipo) {
      params += `&tipo=${tipo}`;
    }
    return this.http.get<PqrResponse>(`${this.baseUrl}/pqrs${params}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un PQR específico por ID
  getPqr(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pqr/${id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
      
    );
  }

  // Método para eliminar un PQR por ID
  deletePqr(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pqr/${id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar un PQR
  updatePqr(id: number, pqrData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/pqr/${id}`, pqrData, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar errores
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}