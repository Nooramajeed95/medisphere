const KEY = "medisphere-orders";
const FLOW = ["Pending", "Processing", "Shipped", "Delivered"];

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const writeAll = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export const getAllOrders = () => readAll().slice().reverse();

export const getUserOrders = (email) =>
  readAll().filter((o) => o.email === email).reverse();

export const addOrder = (order) => {
  const orders = readAll();
  const id = orders.reduce((max, o) => Math.max(max, o.id), 1000) + 1;
  writeAll([...orders, { ...order, id }]);
  return id;
};

export const updateOrderStatus = (id, status) =>
  writeAll(readAll().map((o) => (o.id === id ? { ...o, status } : o)));

export const deleteOrder = (id) => writeAll(readAll().filter((o) => o.id !== id));

// Used by the old demo button on the customer's Orders page
export const advanceStatus = (id) => {
  writeAll(
    readAll().map((o) => {
      if (o.id !== id) return o;
      const next = FLOW.indexOf(o.status) + 1;
      return next > 0 && next < FLOW.length ? { ...o, status: FLOW[next] } : o;
    })
  );
};