import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // Redirecciona al llegar a "0"
    count === 0 && history.push('/');
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        padding: '60px',
        margin: 'auto',
        textAlign: 'center'
      }}
    >
      <p>Será redireccionado en {count} segundos</p>
    </div>
  );
};

export default LoadingToRedirect;
