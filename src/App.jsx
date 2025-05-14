import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Footer from './components/Footer';
import CartPage from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderStatus from './pages/OrderStatus';
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-status" element={<OrderStatus />} />
      </Routes>
      <Footer />
    </div>
  );
}
