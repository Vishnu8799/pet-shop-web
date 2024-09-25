import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import './Home.css'

function UserHome({ products, addToCart }) {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [selectedQuantities, setSelectedQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const handleQuantityChange = (productId, delta) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta),
    }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, selectedQuantities[product.id]);
    setSelectedQuantities((prev) => ({
      ...prev,
      [product.id]: 1, // Reset quantity after adding to cart
    }));
    navigate('/cart'); // Use navigate instead of history.push
  };

  return (
    <div className="user-home">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <h3>{product.category}</h3>
          <p>Price: ${product.offerPrice}</p>
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
            <span>{selectedQuantities[product.id]}</span>
            <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
          </div>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default UserHome;
