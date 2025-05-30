import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import UserGoals from "@/pages/UserGoals";
import NotFound from "@/pages/NotFound";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Transactions from "./pages/Transactions";

const queryClient = new QueryClient();

// Protected Route component


const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* User Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />

          <Route 
            path="/dashboard/goals" 
            element={
                <UserGoals />
            } 
          />
          <Route 
            path="/dashboard/transactions" 
            element={
                <Transactions />

            } 
          />
          <Route 
            path="/dashboard/settings" 
            element={
                <Settings />

            } 
          />
          <Route 
            path="/dashboard/profile" 
            element={
              <Profile />

            } 
          />
          <Route 
            path="/dashboard/help" 
            element={
                <Help />

            } 
          />
          
          {/* Admin Dashboard Route */}
          <Route 
            path="/admin" 
            element={
                <AdminDashboard />

            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
