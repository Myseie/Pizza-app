import { Pool } from "pg";

export const pool = new Pool ({
    user:"postgres",
    host:"localhost",
    database:"pizza_app",
    password:"pepsi1234",
    port: 5432,
});

pool.on("connect", () => {
    console.log("Ansluten till databasen");
});

pool.on("error", (err) => {
    console.error("Fel i databasen:", err);
});