// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (userId) => {
    setUserId(userId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ userId, isAuthenticated, handleLoginSuccess, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
