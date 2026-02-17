import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import AuthModal from "./components/AuthModal";
import AuthProvider from "./context/AuthContext";

const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Home openModal={() => setIsModalOpen(true)} />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
        </Routes>

        {/* Global Auth Modal */}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
