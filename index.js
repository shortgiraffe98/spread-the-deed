import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(5432, () => {
    console.log("server running");
})
