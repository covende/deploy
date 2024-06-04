import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useGoogleAnalytics(analytics) {
  const location = useLocation();
  React.useEffect(() => {
    analytics.init();
  }, []);

  React.useEffect(() => {
    const currentPath = location.pathname + location.search;
    analytics.sendPageview(currentPath);
  }, [location]);
}
