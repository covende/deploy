import { useState, useEffect } from 'react';

function useKeyPress(targetKey) {
  // Estado para realizar un seguimiento de si se presiona la tecla
  const [keyPressed, setKeyPressed] = useState(false);

  // Si la tecla presionada es nuestra tecla de destino, establezca en verdadero
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // Si la tecla soltada es nuestra tecla de destino, establezca como falsa
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Agregando event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Quitar event listeners en la limpieza
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // El arreglo vacío garantiza que el efecto solo se ejecute al montar y desmontar

  return keyPressed;
}

export default useKeyPress;
