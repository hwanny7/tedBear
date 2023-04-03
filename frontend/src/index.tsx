import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
if (gaTrackingId !== undefined) {
  ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
}
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
