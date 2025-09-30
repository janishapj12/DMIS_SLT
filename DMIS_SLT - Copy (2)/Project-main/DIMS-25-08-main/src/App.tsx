import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Bio from "./pages/BiometricAuth";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import SystemStatus from "./pages/admin/SystemStatus";
import UserStatistics from "./pages/admin/UserStatistics";
import SecurityReports from "./pages/admin/SecurityReports";
import SystemLogs from "./pages/admin/SystemLogs";
import Audit from "./pages/admin/AuditLogs"
import Profile from "./pages/user/Profile";

import NotFound from "./pages/NotFound";
import BlockChain from "./pages/admin/BlockChain";
import BlockChainUser from "./pages/user/BlockChainUser";
import BiometricAuth from "./pages/BiometricAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bio" element={<BiometricAuth />} />
            <Route path="/signup" element={<Signup />} />
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/system-status" element={<SystemStatus />} />
            <Route path="/admin/audit-logs" element={<Audit />} />
            <Route path="/admin/user-statistics" element={<UserStatistics />} />
            <Route path="/admin/security-reports" element={<SecurityReports />} />
            <Route path="/admin/system-logs" element={<SystemLogs />} />
            <Route path="/admin/blockchain" element={<BlockChain />} />
            
           
        
            
            {/* User Routes */}
            
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/blockchain-user" element={<BlockChainUser />} />
           
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;