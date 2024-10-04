import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PqrService } from '../services/pqr.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-pqr',
  templateUrl: './edit-pqr.component.html',
  styleUrls: ['./edit-pqr.component.css'],
  imports: [
    CommonModule, // Asegúrate de importar CommonModule
    ReactiveFormsModule // Importa ReactiveFormsModule aquí
  ]
})
export class EditPqrComponent implements OnInit {
  pqrForm: FormGroup;
  pqrId: number | null = null; // Inicializar con null
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pqrService: PqrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.pqrForm = this.fb.group({
      identificacion: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      medio_notificacion: ['', Validators.required],
      tipo: ['', Validators.required],
      causas: ['', Validators.required],
      observacion: [''],
      fecha_incidencia: ['', Validators.required] // Asegúrate de incluir esto
    });
  }

  ngOnInit(): void {
    this.pqrId = +this.route.snapshot.paramMap.get('id')!; // Obtén el ID del PQR desde la ruta
    this.loadPqr(); // Carga el PQR para editar
  }

  loadPqr(): void {
    this.pqrService.getPqr(this.pqrId!).subscribe( // Usa el operador de aserción no nula aquí si estás seguro de que pqrId no es null
      (data) => {
        this.pqrForm.patchValue(data); // Llena el formulario con los datos del PQR
        this.loading = false;
      },
      (error) => {
        console.error('Error loading PQR:', error);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.pqrForm.valid) {
      this.pqrService.updatePqr(this.pqrId!, this.pqrForm.value).subscribe(
        () => {
          alert('PQR actualizado con éxito');
          this.router.navigate(['/pqrs']); // Redirige a la lista de PQRs
        },
        (error) => {
          console.error('Error updating PQR:', error);
        }
      );
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }
}