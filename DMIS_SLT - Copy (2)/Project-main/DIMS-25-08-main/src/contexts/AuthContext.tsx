import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, email: string, full_name: string, password: string) => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  const API_BASE = "http://localhost:5000/api/users";

  // Decode JWT manually
  const decodeToken = (t: string) => {
    try {
      const payload = JSON.parse(atob(t.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          name: decoded.username || decoded.full_name || decoded.email
        });
      } else {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      }
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      if (res.data.success) {
        const t = res.data.data.token;
        setToken(t);
        localStorage.setItem("authToken", t);

        const decoded = decodeToken(t);
        if (decoded) {
          setUser({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.username || decoded.full_name || decoded.email
          });
        }

        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const signup = async (username: string, email: string, full_name: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_BASE}/register`, { username, email, full_name, password });
      if (res.data.success) {
        await login(email, password);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
