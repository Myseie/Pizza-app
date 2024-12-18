import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import Navbar from "./components/Navbar.tsx";
import Cart from "./components/Cart";
import { CartProvider } from './contexts/CartContext.tsx';
import OrderConfirmation from './components/OrderConfirmation.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import "./App.css"


const App: React.FC = () => {
  return(
    <CartProvider>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;

