import React from 'react';
import AppRouter from './router/AppRouter';
// import { AuthProvider } from './context/AuthContext'; // Bunu oluþturduktan sonra bu satýrý açacaðýz

// './App.css' importunu silebilirsin, global stilleri main.jsx'ten yöneteceðiz.

function App() {
    return (
        // <AuthProvider> {/* AuthContext'i oluþturunca bu sarmalamayý yapacaðýz */}
        <AppRouter />
        // </AuthProvider>
    );
}

export default App;