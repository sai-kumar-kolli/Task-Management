import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles.css';
import keycloak from './auth/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';


// Initialize Keycloak
const initOptions = {
  onLoad: 'login-required', // Ensure user is authenticated
  checkLoginIframe: false,
  pkceMethod:'S256'  // Disable login iframe check
};

keycloak.init(initOptions).then(authenticated => {
  ReactDOM.render(
    <Provider store={store}>
      <ReactKeycloakProvider keycloak={keycloak}>
        <App />
      </ReactKeycloakProvider>
    </Provider>,
    document.getElementById('root')
  );
}).catch(err => {
  console.error('Keycloak initialization failed', err);
});
