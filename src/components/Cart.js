import React from 'react';
import './Cart.css'
import { useNavigate } from 'react-router-dom';


function Cart({ cartItems, updateCartItemQuantity, removeFromCart, placeOrder }) {

  const navigate = useNavigate();

  const handleQuantityChange = (productId, delta) => {
    updateCartItemQuantity(productId, delta);
  };


  const handlePlaceOrder = () => {
    placeOrder();  // Call the placeOrder function passed from the parent component
    navigate('/orders');  // Redirect to Orders page
  };


  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="product-card"> {/* Reuse the card design */}
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ${item.offerPrice}</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <p>Subtotal: ${(item.offerPrice * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
