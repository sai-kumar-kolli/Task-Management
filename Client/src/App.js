// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashBoard';
import Login from './pages/login';
import Layout from './components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCsrfToken } from './auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.auth.csrfToken);
  const status = useSelector((state) => state.auth.status);

  console.log(csrfToken, "toejknmn")

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCsrfToken());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <>
      {csrfToken?.length > 0 ?
        <Router>
          <Layout>
            <ToastContainer />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
        : "Loading..."}
    </>

  );
}

export default App;
