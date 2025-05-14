import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { authTokens, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout(); // Clears context + localStorage
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Suri Tiffin Service</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={isActive("/") ? "active" : ""} onClick={toggleMenu}>Home</Link>
        <Link to="/menu" className={isActive("/menu") ? "active" : ""} onClick={toggleMenu}>Menu</Link>
        <Link to="/cart" className={isActive("/cart") ? "active" : ""} onClick={toggleMenu}>Cart</Link>
        <Link to="/order-status" className={isActive("/order-status") ? "active" : ""} onClick={toggleMenu}>Order Status</Link>
      
        {!authTokens ? (
          <Link to="/login" className={isActive("/login") ? "active" : ""} onClick={toggleMenu}>Login</Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
