import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCsrfToken } from '../features/tasks/taskSlice';

const CsrfContext = createContext('');

const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/csrf-token', {
                    credentials: 'include',
                });
                const data = await response.json();
                setCsrfToken(data.csrfToken);
                dispatch(addCsrfToken(data.csrfToken));
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    return (
        <CsrfContext.Provider value={csrfToken}>
            {children}
        </CsrfContext.Provider>
    );
};

const useCsrf = () => {
    return useContext(CsrfContext);
};

export { CsrfProvider, useCsrf };
