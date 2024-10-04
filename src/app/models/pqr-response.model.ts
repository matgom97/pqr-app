export interface PqrResponse {
    data: any[]; // Cambia 'any' por el tipo específico de tus PQRS si es posible
    total: number;
  }
  
  export interface Pqr {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
    identificacion: string;
    correo: string;
    tipo: string;
    causas: string;
    observacion: string;
    // Agrega más campos según la estructura de PQR.
  }