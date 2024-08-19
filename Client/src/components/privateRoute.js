// src/components/PrivateRoute/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { keycloak } = useKeycloak();

    return (
        <Route
            {...rest}
            element={keycloak?.authenticated ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
