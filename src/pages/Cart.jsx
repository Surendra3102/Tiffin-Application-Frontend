import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Cart.css';

const isDevelopment = import.meta.env.MODE === 'development';
const BASE_URL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { authTokens } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!authTokens?.access) {
      alert("You need to be logged in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({
        menu_item: item.id,
        quantity: item.quantity,
      })),
      payment_method: paymentMethod,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/orders/`, orderPayload, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h2>Total: ₹{total.toFixed(2)}</h2>
        <div className="payment-method">
          <label>Select Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash">Cash on Take</option>
            <option value="online">Online Payment</option>
          </select>
        </div>
        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
