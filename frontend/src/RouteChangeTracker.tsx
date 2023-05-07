import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // localhost는 기록하지 않음
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      if (process.env.REACT_APP_GA_TRACKING_ID !== undefined) {
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      }

      setInitialized(true);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      if (location.pathname.includes('/learning')) {
        ReactGA.set({ page: '/learning' });
        ReactGA.send('pageview');
      } else if (location.pathname.includes('/search')) {
        ReactGA.set({ page: '/search' });
        ReactGA.send('pageview');
      } else {
        ReactGA.set({ page: location.pathname });
        ReactGA.send('pageview');
      }
    }
  }, [initialized, location]);

  // 개발용
  useEffect(() => {
    if (process.env.REACT_APP_GA_TRACKING_ID !== undefined) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    }

    if (initialized) {
      if (location.pathname.includes('/learning')) {
        ReactGA.set({ page: '/learning' });
        ReactGA.send('pageview');
      } else if (location.pathname.includes('/search')) {
        ReactGA.set({ page: '/search' });
        ReactGA.send('pageview');
      } else {
        ReactGA.set({ page: location.pathname });
        ReactGA.send('pageview');
      }
    }
  }, [location]);
};

export default RouteChangeTracker;
