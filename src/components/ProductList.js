import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import './ProductList.module.css';

const products = [
  { id: 1, name: 'Product 1', price: 10, quantity: 1 },
  { id: 2, name: 'Product 2', price: 20, quantity: 1 },
  { id: 3, name: 'Product 3', price: 30, quantity: 1 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <div className='wrapper'>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <select
              value={selectedQuantities[product.id] || 1}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                handleQuantityChange(product.id, newQuantity);
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            <button onClick={() => handleAddToCart({ ...product, quantity: selectedQuantities[product.id] || 1 })}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
