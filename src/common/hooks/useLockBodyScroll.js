import { useLayoutEffect } from 'react';

function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Obtenga el valor original del desbordamiento del body
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Evitar el desplazamiento en el scroll
    document.body.style.overflow = 'hidden';
    // Vuelve habilitar el desplazamiento cuando se desmonta el componente
    return () => (document.body.style.overflow = originalStyle);
  }, []); // El arreglo vacío garantiza que el efecto solo se ejecute al montar y desmontar
}

export default useLockBodyScroll;
