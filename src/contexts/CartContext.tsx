
import React, {createContext, useContext, useState} from "react";


type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type CarContextType = {
    cart: CartItem[];
    addToCart: (pizza: CartItem) => void;
    updateQuantity: (id:number, quantity:number) => void;
    removeFromeCart: (id:number) => void;
    getTotal: () => number;
};

const CartContext = createContext<CarContextType | undefined>(undefined);

export const CartProvider: React.FC <{children: React.ReactNode}> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    //const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

    const addToCart = (pizza: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === pizza.id);
            if(existingItem) {
                return prevCart.map((item) =>
                item.id === pizza.id ? {...item, quantity: item.quantity + 1} : item
            );
            

            }else {
                return [...prevCart, { ...pizza, quantity: 1}];
            }
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: quantity} : item
        )
    );
    };

    const removeFromeCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

   /* const placeOrder = async() => {
        setIsProcessingOrder(true);
        try{
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("Din beställning är mottagen!");
            setCart([]);
        }catch(error) {
            console.error("Error processing order", error);
            alert("Kunde inte slutföra beställning. Försök igen");
        }finally {
            setIsProcessingOrder(false);
        }
    }
        */


    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromeCart, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error ("useCart must be used within a CartProvider");
    }
    return context;
};