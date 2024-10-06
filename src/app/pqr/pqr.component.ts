// src/app/pqr/pqr.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PqrService } from '../services/pqr.service'; // Asegúrate de tener este servicio creado
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pqr',
  standalone: true,
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class PqrComponent {
  pqrForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder, private pqrService: PqrService) {
    this.pqrForm = this.fb.group({
      fecha_incidencia: ['', Validators.required],
      identificacion: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      medio_notificacion: [''],
      tipo: ['', Validators.required],
      causas: [''],
      observacion: ['', Validators.required],
      evidencias: ['']
    });
    
  }

  onSubmit(): void {
    if (this.pqrForm.valid) {
      this.pqrService.createPqr(this.pqrForm.value).subscribe({
        next: (response) => {
          console.log('PQR creada:', response);
          this.router.navigate(['/pqrs']);
        },
        error: (error) => {
          console.error('Error al crear PQR:', error);
          this.router.navigate(['/pqrs']);
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}