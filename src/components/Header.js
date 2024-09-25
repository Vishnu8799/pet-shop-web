import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ userType, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Pet Shop</h1>
      </div>
      {userType === 'admin' ? (
      <div style={{fontSize:'20px',fontWeight:'bold'}}>Admin Page</div>
      ):(
      <div style={{fontSize:'20px',fontWeight:'bold'}}>Welcome to My Pet Shop</div>
      )}
      <nav className="nav-links">
        {userType === 'admin' ? (
          <>
            <Link to="/admin-home">Home</Link>
            <Link to="/add-product">Add Product</Link>
            <Link onClick={handleLogout}> Logout</Link>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>
            <Link to="/cart">Add to Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link onClick={handleLogout}> Logout</Link>

          </>
        )}
        {/* <div onClick={handleLogout} className="logout-button">Logout</div> */}
      </nav>
    </header>
  );
}

export default Header;
