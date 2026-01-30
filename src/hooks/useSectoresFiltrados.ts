import type { Sector } from '@/models/sector';

export const useSectoresFiltrados = (sectores: Sector[], ids: number[]) => {
  return sectores.filter((s) => s.padreId === null && ids.includes(s.id));
};