import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("medisphere-admin") === "yes");

  const adminLogin = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("medisphere-admin", "yes");
      setIsAdmin(true);
      return { ok: true };
    }
    return { ok: false, message: "Wrong admin username or password." };
  };

  const adminLogout = () => {
    localStorage.removeItem("medisphere-admin");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);