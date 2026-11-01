import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

// remove the old "remembered forever" login from earlier versions
localStorage.removeItem("medisphere-admin");

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("medisphere-admin") === "yes");

  const adminLogin = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("medisphere-admin", "yes");
      setIsAdmin(true);
      return { ok: true };
    }
    return { ok: false, message: "Wrong admin username or password." };
  };

  const adminLogout = () => {
    sessionStorage.removeItem("medisphere-admin");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);