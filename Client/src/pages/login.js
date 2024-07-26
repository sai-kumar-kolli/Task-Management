import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import './login.css'; // Import login styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <Container>
            <Typography variant="h4" gutterBottom align='center'>
                Login
            </Typography>
            <form className="login-form" >
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
