import express from "express";

const app = express();



app.listen(5432, () => {
    console.log("server running");
})