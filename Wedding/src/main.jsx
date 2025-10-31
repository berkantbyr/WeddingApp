import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Bunu '/assets/styles/global.scss' ile deðiþtirebilirsin
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. ADIM: Buraya import et

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter> {/* <-- 2. ADIM: App'i bununla sarmala */}
            <App />
        </BrowserRouter> {/* <-- 2. ADIM: Kapatmayý unutma */}
    </StrictMode>
);