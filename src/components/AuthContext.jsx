import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("acadzone_user");
    if (stored) setUser(JSON.parse(stored));
    const storedOrders = localStorage.getItem("acadzone_orders");
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  const login = (data) => {
    const userData = { ...data, id: Date.now() };
    setUser(userData);
    localStorage.setItem("acadzone_user", JSON.stringify(userData));
  };

  const register = (data) => {
    const userData = { ...data, id: Date.now() };
    setUser(userData);
    localStorage.setItem("acadzone_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("acadzone_user");
  };

  const addOrder = (order) => {
    const newOrder = { ...order, id: `ORD-${Date.now()}`, date: new Date().toISOString().split("T")[0] };
    const updated = [...orders, newOrder];
    setOrders(updated);
    localStorage.setItem("acadzone_orders", JSON.stringify(updated));
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("acadzone_orders", JSON.stringify(updated));
  };

  const rateOrder = (orderId, rating, comment) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, rated: true, rating, comment } : o
    );
    setOrders(updated);
    localStorage.setItem("acadzone_orders", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, orders, addOrder, updateOrderStatus, rateOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
