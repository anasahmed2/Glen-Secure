import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AuthPage from './login_page.jsx'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Set AuthPage as the root */}
        <Route path="/app" element={<App />} /> {/* Optional: Move App to a different route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);