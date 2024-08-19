import React from "react";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './layout.css'
const Layout = ({ children }) => {

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Management
                    </Typography>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Dashboard</Link>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                </Toolbar>
            </AppBar>
            <main className="layout">
                {children}
            </main>
        </>
    )
}

export default Layout;
