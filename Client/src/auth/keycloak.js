// src/keycloak.js

import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'react-client',
});

export default keycloak;
