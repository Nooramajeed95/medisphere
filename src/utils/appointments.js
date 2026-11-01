const KEY = "medisphere-appointments";

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const getUserAppointments = (email) =>
  readAll().filter((a) => a.email === email).reverse();

export const addAppointment = (appt) => {
  const all = readAll();
  localStorage.setItem(KEY, JSON.stringify([...all, { ...appt, id: Date.now() }]));
};

export const cancelAppointment = (id) => {
  const all = readAll().map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a));
  localStorage.setItem(KEY, JSON.stringify(all));
};