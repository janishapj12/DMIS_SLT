import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  signup: (username: string, email: string, full_name: string, password: string) => Promise<User | null>;
  metamaskLogin: (walletAddress: string) => Promise<User | null>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps { children: ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const API_BASE = "http://localhost:5000/api/users";

  const decodeToken = (t: string) => {
    try { return JSON.parse(atob(t.split(".")[1])); } 
    catch { return null; }
  };

  const setUserFromToken = (t: string) => {
    setToken(t);
    localStorage.setItem("authToken", t);
    const decoded = decodeToken(t);
    if (!decoded) return null;
    const u: User = {
      id: decoded.id,
      email: decoded.email || `${decoded.username}@metamask.com`,
      role: decoded.role,
      name: decoded.username || decoded.full_name || decoded.email,
      walletAddress: decoded.walletAddress || decoded.username
    };
    setUser(u);
    return u;
  };

  useEffect(() => { if (token) setUserFromToken(token); }, [token]);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      if (res.data.success) return setUserFromToken(res.data.data.token);
      return null;
    } catch { return null; }
  };

  const signup = async (username: string, email: string, full_name: string, password: string): Promise<User | null> => {
    try {
      const res = await axios.post(`${API_BASE}/register`, { username, email, full_name, password });
      if (res.data.success) return login(email, password);
      return null;
    } catch { return null; }
  };

  const metamaskLogin = async (walletAddress: string): Promise<User | null> => {
    try {
      const res = await axios.post(`${API_BASE}/metamask-login`, { walletAddress });
      if (res.data.success) return setUserFromToken(res.data.data.token);
      return null;
    } catch { return null; }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, metamaskLogin, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
