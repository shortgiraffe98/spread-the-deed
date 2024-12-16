import express from "express";
import cors from "cors";
const app = express();
app.use(cors({origin: ["http://127.0.0.1:5500", "https://donation-campaigns-nab.vercel.app"], credentials: true }));

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(8800, () => {
    console.log("server running");
})
