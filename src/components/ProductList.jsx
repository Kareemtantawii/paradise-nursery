// src/components/ProductList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../redux/CartSlice';

// Plant data: at least 6 unique plants, grouped into 3 categories
const plantData = {
  "Indoor Plants": [
    { id: 1, name: "Monstera Deliciosa", price: 25, image: "https://images.unsplash.com/photo-1614594976925-1b3b52d8d9b4?w=150&h=150&fit=crop" },
    { id: 2, name: "Fiddle Leaf Fig", price: 45, image: "https://images.unsplash.com/photo-1592807528172-5657e2f8d7b5?w=150&h=150&fit=crop" },
  ],
  "Outdoor Plants": [
    { id: 3, name: "Lavender", price: 12, image: "https://images.unsplash.com/photo-1612464213397-86b2b2f6a8b1?w=150&h=150&fit=crop" },
    { id: 4, name: "Rosemary", price: 10, image: "https://images.unsplash.com/photo-1607162503616-5cd6aff44ef2?w=150&h=150&fit=crop" },
  ],
  "Succulents": [
    { id: 5, name: "Aloe Vera", price: 8, image: "https://images.unsplash.com/photo-1578916171823-7d6d0c1e0b0f?w=150&h=150&fit=crop" },
    { id: 6, name: "Jade Plant", price: 15, image: "https://images.unsplash.com/photo-1607457566106-6b5a7c9cd7b6?w=150&h=150&fit=crop" },
  ],
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ 
      id: plant.id, 
      name: plant.name, 
      price: plant.price, 
      image: plant.image 
    }));
    setAddedItems([...addedItems, plant.id]);
  };

  // Calculate total number of items in cart (sum of quantities)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Navbar with links to Home, Plants, Cart and cart icon count */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart">Cart ({totalCartItems})</Link>
        </div>
      </nav>

      <div className="product-list-container">
        {Object.entries(plantData).map(([category, plants]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="plants-grid">
              {plants.map(plant => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedItems.includes(plant.id)}
                  >
                    {addedItems.includes(plant.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
