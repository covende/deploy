import { useState, useEffect } from 'react';

const useScript = (url) => {
  const [isActive, setIsActive] = useState();
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);
    setIsActive(true);
    return () => {
      document.body.removeChild(script);
      setIsActive(false);
    };
  }, [url]);

  return { active: isActive };
};

export default useScript;
