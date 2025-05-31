import {  Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import UserGoals from "@/pages/UserGoals";
import NotFound from "@/pages/NotFound";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Transactions from "./pages/Transactions";


// Protected Route component


const App = () => (
  
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
);

export default App;
