import React from "react";
import { Link } from "react-router-dom";
import {useCart} from "../contexts/CartContext";

const Home: React.FC = () => {
    const {cart, getTotal} = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header>
        <h1>Välkommen till Pizzerian!</h1>
        <nav className="navbar">
        <Link to="/admin"><button>Admin</button></Link>
                <Link to="/"><button>Hem</button></Link>
                <Link to="/menu"><button>Meny</button></Link>
                <Link to="/cart">
                <button>Varukorg</button>
              </Link>
        </nav>
      </header>
      <main>
        <p>Välj från vår meny för att beställa din favoritpizza!</p>
        <p>Antal pizzor i varukorgen: {totalItems}</p>
              <p>Total kostnad: {getTotal()}</p>

      </main>

      <footer>
        <p>© 2024 Pizzerian</p>
      </footer>
    </div>
  );
};

export default Home;
