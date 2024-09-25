import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function AdminHome({ products, editProduct, deleteProduct }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    category: '',
    image: '',
    originalPrice: '',
    offerPrice: '',
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedProduct(products[index]);
  };

  const saveEdit = (index) => {
    editProduct(index, editedProduct);  // Update product in parent state
    setEditIndex(null);  // Exit edit mode
  };

  return (
    <div className="admin-home">
      {/* <h1>Admin Home</h1> */}
      <Link to="/add-product">
        {/* <button className="add-product-button">Add Product</button> */}
      </Link>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          products.map((product, index) => (
            <div style={{width: '300px',padding: '50px'}} key={index} className="product-card">
              {editIndex === index ? (

                <div >
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="image"
                    value={editedProduct.image}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="originalPrice"
                    value={editedProduct.originalPrice}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="offerPrice"
                    value={editedProduct.offerPrice}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </div>
              ) : (
                // View Mode
                <div >
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>Category: {product.category}</p>
                  <p>Original Price: ${product.originalPrice}</p>
                  <p>Offer Price: ${product.offerPrice}</p>
                  <button onClick={() => startEdit(index)}>Edit</button>
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminHome;
