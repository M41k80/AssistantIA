"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id?: string | number;
  email: string;
  nombre?: string;
  habitos?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nombre: string, habitos: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/login/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      
      localStorage.setItem("token", data.access);
      
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Error en login");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    nombre: string,
    habitos: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/register/`,
        { email, password, nombre, habitos },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Error en registro");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
