import React, { createContext, useState, useContext, useEffect } from "react";
import { readLocal, writeLocal } from "./localStorageHelpers";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readLocal("auth_user", null));

  useEffect(() => writeLocal("auth_user", user), [user]);

  const login = ({ email, password }) => {
    // In a frontend-only app, validate via UserContext (caller should do lookup)
    setUser({ email, name: email.split("@")[0] });
    return true;
  };
  const logout = () => setUser(null);
  const register = (userData) => {
    // registration actual storing handled by UserContext; here we just set user
    setUser({
      email: userData.email,
      name: userData.name || userData.email.split("@")[0],
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
