
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
//import Cart from './components/Cart';
import Navigation from './components/Navigation';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/home" element={<ProductList/>} />
          <Route path="/shopping-cart" element={<Cart/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
