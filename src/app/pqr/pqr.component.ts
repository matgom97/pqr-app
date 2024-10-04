// src/app/pqr/pqr.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PqrService } from '../services/pqr.service'; // Asegúrate de tener este servicio creado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pqr',
  standalone: true,
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class PqrComponent {
  pqrForm: FormGroup;

  constructor(private fb: FormBuilder, private pqrService: PqrService) {
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
          // Aquí puedes agregar lógica para mostrar un mensaje de éxito, redirigir, etc.
        },
        error: (error) => {
          console.error('Error al crear PQR:', error);
          // Aquí puedes manejar el error, mostrar un mensaje, etc.
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}