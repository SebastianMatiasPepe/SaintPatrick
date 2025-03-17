import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { authService } from "./services/authService";
import { Toaster } from "./components/ui/use-toast";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // You might want to validate the token here
        setLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        authService.logout();
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/accounts" element={
                  <ProtectedRoute>
                    <Accounts />
                  </ProtectedRoute>
                } />
                <Route path="/transfer" element={
                  <ProtectedRoute>
                    <Transfer />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default App;
