import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItemQuantity, toggleCartItemEditMode,removeItemFromCart } from '../slices/cartSlice';
import style from './Cart.module.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleEditClick = (item) => {
    dispatch(toggleCartItemEditMode(item.id));
  };

  const handleSaveClick = (item) => {
    // Update the quantity and exit edit mode
    dispatch(updateCartItemQuantity({ itemId: item.id, newQuantity: item.quantity }));
    dispatch(toggleCartItemEditMode(item.id));
  };

  const handleCancelClick = (item) => {
    // Revert changes and exit edit mode
    dispatch(updateCartItemQuantity({ itemId: item.id, newQuantity: item.originalQuantity }));
    dispatch(toggleCartItemEditMode(item.id));
  };
  const handleRemoveClick=(item)=>{
    //Remove items from cart
    dispatch(updateCartItemQuantity({ itemId: item.id, newQuantity: item.originalQuantity }));
    dispatch(removeItemFromCart(item.id));
  }

  return (
    <div>
    {cartItems.map((item) => (
      <div className={style.box} key={item.id}>
        {`${item.name} - ₹${item.price} per item`} 
        {item.isEditing ? (
          <div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                dispatch(updateCartItemQuantity({ itemId: item.id, newQuantity }));
              }}
            />
            <button onClick={() => handleSaveClick(item)}>Save</button>
            <button onClick={() => handleCancelClick(item)}>Cancel</button>
          </div>
        ) : (
          <div>
            {`Quantity: ${item.quantity}`} 
            
            {item.totalPrice !== undefined ? (
              `${item.totalPrice !== undefined ? `Total Price: ₹${item.totalPrice.toFixed(2)}` : 'Total Price: N/A'}`
            ) : (
              'Total Price: N/A'
            )}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => handleRemoveClick(item)}>Remove</button>
            
          </div>
          
        )}
      </div>
    ))}
    <div className={style.box}>
      {`Total Cart Price: ₹${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`}
    </div>
  </div>
  );
};

export default Cart;
