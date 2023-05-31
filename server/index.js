const express = require("express");
const app = express();
const mysql = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "gdb",
});

app.listen(3001, () =>{
    console.log("rodando na porta 3001")
});