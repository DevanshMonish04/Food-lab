import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";   // ✅ import router
import App from './App.jsx';
import AuthContextProvider from './context/AuthContext.jsx';
import "./index.css";
import AdminContext from './context/AdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BrowserRouter>  
    <AdminContext>  {/* ✅ wrap your App with Router */}
      <App />
      </AdminContext>  
    </BrowserRouter>
  </AuthContextProvider>
);
