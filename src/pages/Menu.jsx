import React, { useEffect, useState, useContext } from 'react';
import './Menu.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isDevelopment = import.meta.env.MODE === 'development';
const BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${BASE_URL}/api/menu/`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error('Error fetching menu:', err));
  }, []);

  const handleAddToCart = (item) => {
    if (!authTokens?.access) {
      toast.warn('Please log in to add items to your cart.', {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <div className="menu-details">
              <h2 className="menu-name">{item.name}</h2>
              <p className="menu-description">{item.description}</p>
              <div className="menu-footer">
                <span className="menu-price">&#8377;{item.price}</span>
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Toast container */}
      <ToastContainer />
    </div>
  );
}
