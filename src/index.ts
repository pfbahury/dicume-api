import express from "express";

const app = express();

app.get("/", (_req, res) => {
    res.send("Welcome to Dicumê API");
});

app.listen(5050);
console.log(`Server is running on http://localhost:5050`);