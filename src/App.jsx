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

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Home openModal={() => setIsModalOpen(true)} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plan/:id" element={<PlanDetails />} />
              <Route path="/payment" element={<DummyPayment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route
                path="/payment-cancel"
                element={<div>Payment Cancelled</div>}
              />
            </Routes>
          </Layout>
        </div>

        {/* Global Auth Modal */}
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
