import { getClientePorDni } from '../services/clienteService';

export const handleDniSubmit = async ({ dni, setIsLoading, navigate }) => {
  setIsLoading(true);
  try {
    const clienteData = await getClientePorDni(dni);
    sessionStorage.setItem('datosCliente', JSON.stringify(clienteData));
    setTimeout(() => {
      setIsLoading(false);
      navigate('/secciones');
    }, 500);
  } catch (error) {
    console.error("Error al consultar la API:", error);
    sessionStorage.removeItem('datosCliente');
    setTimeout(() => {
      setIsLoading(false);
      alert(error.message || "Ocurrió un error inesperado al realizar la consulta.");
    }, 500);
  }
};
