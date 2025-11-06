export const useSectoresFiltrados = (sectores, ids) => {
  return sectores.filter(s => s.padreId === null && ids.includes(s.id));
};