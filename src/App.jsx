import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AuthModal from "./components/auth/AuthModal";
import AuthProvider from "./context/AuthContext";
import PlanDetails from "./pages/PlanDetails";
import Layout from "./components/layout/Layout";
import PaymentSuccess from "./pages/PaymentSuccess";
import DummyPayment from "./pages/DummyPayment";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
          
          <Layout>
            <Routes>

              {/* ✅ PUBLIC ROUTE */}
              <Route
                path="/"
                element={<Home openModal={() => setIsModalOpen(true)} />}
              />

              {/* 🔒 PROTECTED ROUTES */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/plan/:id"
                element={
                  <ProtectedRoute>
                    <PlanDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <DummyPayment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />

              {/* Optional */}
              <Route
                path="/payment-cancel"
                element={<div>Payment Cancelled</div>}
              />

            </Routes>
          </Layout>
        </div>

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