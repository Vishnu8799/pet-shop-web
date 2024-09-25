import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'

function AddProduct({ addProductToList }) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    image: '',
    originalPrice: '',
    offerPrice: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToList(product);  // Use the function passed from App.js
    navigate('/admin-home');
  };

  return (
    <div className="add-product">
      <h1 style={{justifyContent:'center',display:'flex'}}>Add Product</h1>
      <div style={{display:'flex',justifyContent:'center',alignContent:'center',width:'100%'}}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
        <input type="number" name="originalPrice" placeholder="Original Price" onChange={handleChange} required />
        <input type="number" name="offerPrice" placeholder="Offer Price" onChange={handleChange} required />
        <div style={{display:'flex',justifyContent:'center'}}>
        <button type="submit" style={{width:'20%',borderRadius:'10px'}}>Add Product</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddProduct;
