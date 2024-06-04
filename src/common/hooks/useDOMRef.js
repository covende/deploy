import { useState, useCallback } from 'react';

const useDOMRef = () => {
  const [DOMRef, setRefState] = useState({});
  const setRef = useCallback((node) => {
    setRefState((prevRefs) => ({
      ...prevRefs,
      [node.dataset.refkey]: node
    }));
  }, []);
  return [DOMRef, setRef];
};

// Uso
//  const Component = () => {
//     const [{ ref_1, ref_2 }, setRef] = useDOMRef();
//     return (
//       <>
//         <button ref={setRef} data-refkey="ref_1">
//           click me!
//         </button>
//         <button ref={setRef} data-refkey="ref_2">
//           click me too!
//         </button>
//       </>
//     );
//   };

export default useDOMRef;
