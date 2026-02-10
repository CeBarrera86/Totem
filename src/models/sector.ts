export interface Sector {
  id: number;
  nombre: string;
  descripcion?: string | null;
  padreId: number | null;
}