// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

// Landing page component with company name and Get Started button
const LandingPage = () => {
  return (
    <div className="landing">
      <h1>Paradise Nursery</h1>
      <p>Bring Nature Home</p>
      <Link to="/products">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
