const KEY = "medisphere-orders";
const STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const getUserOrders = (email) =>
  readAll().filter((o) => o.email === email).reverse();

export const addOrder = (order) => {
  const orders = readAll();
  const id = 1001 + orders.length;
  localStorage.setItem(KEY, JSON.stringify([...orders, { ...order, id }]));
  return id;
};

// Demo helper: acts like the admin moving the order forward
export const advanceStatus = (id) => {
  const orders = readAll().map((o) => {
    if (o.id !== id) return o;
    const next = STATUSES.indexOf(o.status) + 1;
    return next < STATUSES.length ? { ...o, status: STATUSES[next] } : o;
  });
  localStorage.setItem(KEY, JSON.stringify(orders));
};