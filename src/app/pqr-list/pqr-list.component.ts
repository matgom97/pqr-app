import { Component, OnInit } from '@angular/core';
import { PqrService } from '../services/pqr.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

@Component({
  selector: 'app-pqr-list',
  standalone: true,
  templateUrl: './pqr-list.component.html',
  styleUrls: ['./pqr-list.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule  // Añadir FormsModule aquí
  ]
})
export class PqrListComponent implements OnInit {
  pqrs: any[] = [];
  filteredPqrs: any[] = [];
  loading: boolean = true;
  filterDate: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private pqrService: PqrService, private router: Router) {}

  ngOnInit(): void {
    this.loadPqrs();  // Llamada inicial a la carga de PQRs
  }

  loadPqrs(): void {
    this.loading = true;
    this.pqrService.getPqrs(this.filterDate, this.filterType, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.pqrs = data;
          this.totalItems = data.length;
          this.applyFilter();
        } else {
          this.pqrs = [];
          this.totalItems = 0;
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error loading PQRS:', error);
        this.loading = false;
      }
    );
  }

  applyFilter(): void {
    this.filteredPqrs = this.pqrs.filter(pqr => {
      const matchesDate = this.filterDate ? new Date(pqr.fecha_incidencia).toDateString() === new Date(this.filterDate).toDateString() : true;
      const matchesType = this.filterType ? pqr.tipo === this.filterType : true;
      return matchesDate && matchesType;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadPqrs();
  }

  editPqr(id: number): void {
    this.router.navigate(['/edit-pqr', id]);
  }

  deletePqr(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta PQR?')) {
      this.pqrService.deletePqr(id).subscribe(
        () => {
          this.loadPqrs();
        },
        (error) => {
          console.error('Error deleting PQR:', error);
        }
      );
    }
  }
}