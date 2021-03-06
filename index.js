const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"Katlego@1995",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});

app.post("/api/post", (req,res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, contact], (err, result)=> {
        if(err) {
            console.log(err);
        }
    });
});

app.delete("/api/delete/:id", (req,res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlDelete, id, (err, result)=> {
        if(err) {
            console.log(err);
        }
    });
});

// app.get("/",(req, res) => {
//     // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('koketso', 'koki@gmail.com', '0715456971')";
//     // db.query(sqlInsert, (err, result) => {
//     //     console.log("error", err);
//     //     console.log("results", result);
//     //     res.send("hey i am successful");
//     // });
// });

app.listen(5000, () => {
    console.log("server running on port 5000");
})