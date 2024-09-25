import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  const [products, setProducts] = useState([]);
  const [userType, setUserType] = useState(null); // 'admin' or 'user'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);


  const addProductToList = (product) => {
    setProducts([...products, product]);
  };

  const editProduct = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };


  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  // const placeOrder = () => {
  //   setOrders([...orders, ...cartItems]);
  //   setCartItems([]);  // Clear the cart after placing the order
  // };
  const placeOrder = () => {
    const newOrders = cartItems.map(item => ({
      ...item,
      id: Date.now() + Math.random(),  // Create a unique ID for each order
    }));
    
    setOrders([...orders, ...newOrders]);  // Move cart items to orders
    setCartItems([]);  // Empty the cart
  };

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
  };


  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Header userType={userType} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn && userType === 'admin' ? (
            <>
              <Route
                path="/admin-home"
                element={<AdminHome products={products} editProduct={editProduct} deleteProduct={deleteProduct} />}
              />
              <Route path="/add-product" element={<AddProduct addProductToList={addProductToList} />} />
            </>
          ) : (
            <>
              <Route path="/admin-home" element={<Navigate to="/" />} />
              <Route path="/add-product" element={<Navigate to="/" />} />
            </>
          )}

          {isLoggedIn && userType === 'user' ? (
            <>
              <Route path="/home" element={<Home products={products} addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems}  updateCartItemQuantity={updateCartItemQuantity}  removeFromCart={removeFromCart} placeOrder={placeOrder}  />} />
              <Route path="/orders" element={<Orders orders={orders} deleteOrder={deleteOrder} />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/cart" element={<Navigate to="/" />} />
              <Route path="/orders" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
