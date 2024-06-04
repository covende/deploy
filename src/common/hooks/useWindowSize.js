import { useState, useEffect } from 'react';

function useWindowSize() {
  // Inicialice el estado con ancho / alto indefinido
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Controlador para llamar al cambio de tamaño de la ventana
    function handleResize() {
      // Establecer el ancho / alto de la ventana al estado
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Agregar detector de eventos
    window.addEventListener('resize', handleResize);

    // Controlador de llamadas de inmediato para que el estado se actualice con el tamaño de la ventana inicial
    handleResize();

    // Eliminar el detector de eventos en la limpieza
    return () => window.removeEventListener('resize', handleResize);
  }, []); // La arreglo vacío garantiza que el efecto solo se ejecute en el montaje

  return windowSize;
}

export default useWindowSize;
