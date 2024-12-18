import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";



const Cart: React.FC = () => {
    const { cart, updateQuantity, removeFromeCart, getTotal} = useCart();

    const navigate = useNavigate();

    const handleOrder = () => {
        const totalPizzas = cart.reduce((sum, item) => sum + item.quantity, 0);
        const preparationTime = 15 + Math.floor(totalPizzas / 5) * 5;
            
        navigate(`/order-confirmation?time=${preparationTime}`);

        alert(`Tack för din beställning! Din pizza kommer om ${preparationTime} minuter`);
    }; 

    return (
        <div>
            <h1>Din Varukorg</h1>
            {cart.length === 0 ? (
                <p>Din varukorg är tom</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Pris: {item.price}</p>
                            <p>Antal: {item.quantity}</p>
                            <div>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled= {item.quantity <= 1}>-</button>
                                <button onClick={() => removeFromeCart(item.id)}>Ta bort</button>
                                <button onClick={handleOrder}>Slutför beställning</button>

                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <h2>Totalkostnad: {getTotal()}</h2>
        </div>
    );
};

export default Cart;