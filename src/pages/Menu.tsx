import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

type Pizza = {
    id: number;
    name: string;
    price: number;
    description: string;
  };

const Menu: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pizzas, setPizzas] = useState<any[]>([]);
    const [error, SetError] = useState<string | null>(null)
    const {addToCart} = useCart();

   useEffect(() => {
    const fetchPizzas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pizzas");
            setPizzas(response.data);
        } catch (err) {
            console.error("Error fetching pizzas", err);
            SetError("Kunde inte hämta pizzor. Försök igen senare");
        } finally {
            setIsLoading(false);
        }
    };
    fetchPizzas();
   }, []);
    
   if(error) {
    return <p>{error}</p>
   }
   if(isLoading) {
    return <p>Laddar pizzor...</p>
   }
    return (
        <div>
            <h1>Vår Meny</h1>
            {error && <p style={{ color:"red"}}>{error}</p>}
            <div>
                {pizzas.map((pizza) => (
                    <div key={pizza.id}>
                        <h2>{pizza.name}</h2>
                        <p>Kategori: {pizza.category}</p>
                        <p>Pris: {pizza.price} kr</p>
                        <p>Ingredienser: {pizza.description}</p>
                        <button onClick={() => addToCart({ id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1})}>Lägg till i varukorgen</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;