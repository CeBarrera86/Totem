import { getClientePorDni } from '@/services/clienteService';

interface HandleDniSubmitArgs {
  dni: string;
  setIsLoading: (value: boolean) => void;
  navigate: (path: string) => void;
}

export const handleDniSubmit = async ({ dni, setIsLoading, navigate }: HandleDniSubmitArgs) => {
  setIsLoading(true);
  try {
    const clienteData = await getClientePorDni(dni);
    sessionStorage.setItem('datosCliente', JSON.stringify(clienteData));
    setTimeout(() => {
      setIsLoading(false);
      navigate('/secciones');
    }, 500);
  } catch (error) {
    console.error('Error al consultar la API:', error);
    sessionStorage.removeItem('datosCliente');
    setTimeout(() => {
      setIsLoading(false);
      alert(error instanceof Error ? error.message : 'Ocurrió un error inesperado al realizar la consulta.');
    }, 500);
  }
};