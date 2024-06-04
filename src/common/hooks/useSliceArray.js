import React, { useState, useEffect } from 'react';

function useSliceArray(array) {
  const [part1, setPart1] = useState([]);
  const [part2, setPart2] = useState([]);
  const [part3, setPart3] = useState([]);

  useEffect(() => {
    const copyArray = [...array];
    if (copyArray.length > 0) {
      const numberSplit = Math.floor(copyArray.length / 3);
      setPart1(copyArray.splice(0, numberSplit));
      setPart2(copyArray.splice(0, numberSplit));
      setPart3(copyArray.splice(0, copyArray.length));
    }
    return () => {
      setPart1([]);
      setPart2([]);
      setPart3([]);
    };
  }, [array]);
  return [part1, part2, part3];
}

export default useSliceArray;
