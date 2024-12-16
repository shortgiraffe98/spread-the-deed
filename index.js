import express from "express";
import cors from "cors";
import 'dotenv/config';
const app = express();
const port = process.env.DATABASE_PORT || 8800;
app.use(cors({origin: ["http://127.0.0.1:5500", "https://donation-campaigns-nab.vercel.app"], credentials: true }));

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log("server running - port " + port);
})
