import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import './login.css'; // Import login styles
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { keycloak } = useKeycloak();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            // Keycloak login
            await keycloak.login({
                redirectUri: window.location.origin,
                loginHint: username // Optional, to pre-fill username
            });
            // Redirect after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom align='center'>
                Login
            </Typography>
            <form className="login-form" onSubmit={login}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
