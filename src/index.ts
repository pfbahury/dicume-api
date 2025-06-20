import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth_routes";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5050; 

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);


app.get("/", (_req, res) => {
    res.status(200).json(
        "DICUME API (DEV) - Version: 1.0.0 | Acesse '/docs' para ver as documentações da API"
    )
});

app.listen(5050);
console.log(`Server is running on http://localhost:${PORT}`);