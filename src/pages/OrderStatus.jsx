import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './OrderStatus.css';
const isDevelopment = import.meta.env.MODE === 'development';
const BASE_URL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/user`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`, // safe access
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Fetched orders:', data); // Debug
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', res.status);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    if (authTokens?.access) {
      fetchOrders();
    }
  }, [authTokens]);

  return (
    <div className="order-status-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.menu_item?.name || 'Unknown Item'} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
