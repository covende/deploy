import { useReducer, useCallback } from 'react';

// Estado inicial que pasamos al useReducer
const initialState = {
  // Arreglo de estado anteriores actualizados cada vez que empujamos un nuevo estado
  past: [],
  // Valor del estado actual
  present: null,
  // Contendrá valores de estado "futuros" si deshacemos (para que podamos rehacer)
  future: []
};

// Nuestra función reductora(reducer) para manejar cambios de estado basados ​​en la "action"
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      };
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      };
    case 'SET':
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      };
    case 'CLEAR':
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent
      };
  }
};

const useHistory = (initialPresent) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Configurar nuestras funciones de devolución de llamada (callback functions)
  // Memorizamos con useCallback para evitar re-renders innecesarias

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    (newPresent) => dispatch({ type: 'SET', newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: 'CLEAR', initialPresent }),
    [dispatch]
  );

  // Si es necesario, también podríamos devolver el estado pasado y futuro
  return {
    state: state.present,
    set,
    undo,
    redo,
    clear,
    canUndo,
    canRedo
  };
};

export default useHistory;
