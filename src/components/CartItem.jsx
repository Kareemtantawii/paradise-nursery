// src/components/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem } from '../redux/CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total number of items in cart (sum of quantities)
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total cost of all items
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {/* Navbar with links to Home, Plants, Cart and cart icon count */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart">Cart ({totalCartQuantity})</Link>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <Link to="/products">Continue shopping</Link>
          </p>
        ) : (
          <>
            {/* Cart items list */}
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width="60" height="60" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">Unit Price: ${item.price}</span>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
                <div className="cart-item-total">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  className="delete-btn" 
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Delete
                </button>
              </div>
            ))}
            
            {/* Cart total and actions */}
            <div className="cart-total">
              <strong>Grand Total: ${totalCost.toFixed(2)}</strong>
            </div>
            <div className="cart-actions">
              <Link to="/products">
                <button className="continue-shopping-btn">Continue Shopping</button>
              </Link>
              <button 
                className="checkout-btn" 
                onClick={() => alert('Coming Soon')}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;
