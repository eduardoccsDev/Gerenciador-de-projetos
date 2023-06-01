const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gdpDB",
    socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
});

app.get("/", (req, res) => {
    db.query(
        "SELECT * FROM categorias" ,
        (err, result) => {
            if(err){
                console.log(err)
            }
        }, (res) =>{
            if(res){
                console.log(res)
            }
        }
        )
})

app.listen(3001, () =>{
    console.log("rodando na porta 3001")
});