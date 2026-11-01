import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read("medisphere-user", null));

  const register = ({ name, email, phone, password }) => {
    const users = read("medisphere-users", []);
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) {
      return { ok: false, message: "This email is already registered." };
    }
    users.push({ name: name.trim(), email: mail, phone, password });
    localStorage.setItem("medisphere-users", JSON.stringify(users));
    return { ok: true };
  };

  const login = (email, password) => {
    const users = read("medisphere-users", []);
    const mail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === mail && u.password === password);
    if (!found) return { ok: false, message: "Wrong email or password." };
    const safeUser = { name: found.name, email: found.email, phone: found.phone };
    setUser(safeUser);
    localStorage.setItem("medisphere-user", JSON.stringify(safeUser));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medisphere-user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);