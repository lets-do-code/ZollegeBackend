import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())


import { UserRoute } from "./routes/UserRoutes.js";
import { EarningsRoute } from "./routes/EarningsRoutes.js";
import { DatabaseConnection } from "./config/Db.js";
app.use('/', UserRoute);
app.use('/', EarningsRoute);


app.listen(port, async () => {
    await DatabaseConnection("mongodb+srv://eazotel:admin@cluster0.p0kewzl.mongodb.net/testhms")
    console.log(`Server listening on ${port}`);
})