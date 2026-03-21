import './config/env.js';
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

// GET API 
app.get("/", (req,res) => {
    res.send("Bakery App API running");
});

const PORT = process.env.PORT || 5000;

// database connection
pool.connect()
    .then(() => console.log("Postgre SQL AWS Connected"))
    .catch(err => console.log("Database connection failed",err));

// User Route handled
app.use("/api/users",userRoutes); 

// backed running on PORT 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


