import React from "react";
import { useLocation } from "react-router-dom"
import "./OrderConfirmation.css";

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const time = queryParams.get("time") || "15";

    return (
        <div>
            <h1>Tack för din beställning!</h1>
            <p>Din pizza kommer om {time} minuter</p>
        </div>
    );
};

export default OrderConfirmation;