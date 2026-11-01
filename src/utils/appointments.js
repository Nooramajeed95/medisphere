const KEY = "medisphere-appointments";

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const writeAll = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export const getAllAppointments = () => readAll().slice().reverse();

export const getUserAppointments = (email) =>
  readAll().filter((a) => a.email === email).reverse();

export const addAppointment = (appt) =>
  writeAll([...readAll(), { ...appt, id: Date.now() }]);

export const cancelAppointment = (id) =>
  writeAll(readAll().map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));

export const updateAppointmentStatus = (id, status) =>
  writeAll(readAll().map((a) => (a.id === id ? { ...a, status } : a)));

export const deleteAppointment = (id) => writeAll(readAll().filter((a) => a.id !== id));