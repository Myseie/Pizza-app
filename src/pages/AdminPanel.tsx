import React, {useState, useEffect} from "react";
import axios from "axios";

const AdminPanel: React.FC = () => {
   
    const [pizzas, setPizzas] = useState([]);
    const [newPizza, setNewPizza] = useState({
        name:"",
        category: "",
        price: 0,
        description: "",
    });

    useEffect(() => {
        const fetchPizzas = async () => {
            const response = await axios.get("http://localhost:5000/pizzas");
            setPizzas(response.data);
        };
        fetchPizzas();
    }, []);

    const handleAddPizza = async () => {
        await axios.post("http://localhost:5000/pizzas", newPizza);
        setNewPizza({ name: "", category: "", price:0, description: ""});
    };

    const handleDeletePizza = async (id:number) => {
        await axios.delete(`http://localhost:5000/pizzas/${id}`);
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Lägg till ny pizza</h2>
            <input placeholder="Namn" onChange={(e) => setNewPizza({...newPizza, name: e.target.value})} />
            <input placeholder="Kategori" onChange={(e) => setNewPizza({...newPizza, category: e.target.value})} />
            <input placeholder="Pris" type="number" onChange={(e) => setNewPizza({...newPizza, price: +e.target.value})} />
            <textarea placeholder="Beskrivning" onChange={(e) => setNewPizza({...newPizza, description: e.target.value})} />
            <button onClick={handleAddPizza}>Lägg till</button>

            <h2> Befintliga Pizzor</h2>
            <ul>
                {pizzas.map((pizza: any) => (
                    <li key={pizza.id}>
                        {pizza.name}
                        <button onClick={() => handleDeletePizza(pizza.id)}>Ta bort</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;