import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Router>
      <AuthProvider>
       <Routes>
        <Route path="*" element ={<App />} />
        </Routes> 
      </AuthProvider>
    </Router>

  </React.StrictMode>
);
