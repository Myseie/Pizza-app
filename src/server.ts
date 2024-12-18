import express, { Request, Response} from "express";
import cors from 'cors';
import { pool } from "./database";


const app = express();
// Middleware
app.use(express.json());
app.use(cors());
// Testroute
app.get("/", (req, res) => {
  res.send("Servern är igång!");
});

app.get("/pizzas", async(req: Request, res:Response) => {
  try {
    const result = await pool.query("SELECT * FROM pizzas");
    res.json(result.rows);
  }catch (error) {
    console.error("Fel vid hämtning av pizzor", error);
    res.status(500).send("Serverfel");
  }
});

app.post("/pizzas", async (req, res) => {
    const { name, category, price, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO pizzas (name, category, price, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, category, price, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

app.put("/pizzas/:id", async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    try {
        const result = await pool.query(
            "UPDATE pizzas SET name=$1, category=$2, price=$3, description=$4 WHERE id=$5 RETURNING *",
            [name, category, price, description, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

app.delete("/pizzas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM pizzas WHERE id=$1", [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// Starta server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
