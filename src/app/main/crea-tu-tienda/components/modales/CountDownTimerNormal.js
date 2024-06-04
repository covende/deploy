import React, { useEffect } from 'react';

function CountDownTimerNormal({ time, setTimer }) {
  useEffect(() => {
    if (time > 0) {
      let interval = setInterval(() => setTimer(time - 1), 1000);
      return () => {
        clearInterval(interval);
        interval = null;
      };
    }
  }, [time]);
  return <span>&nbsp;{time}&nbsp;</span>;
}

export default CountDownTimerNormal;
