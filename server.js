import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
const encoder = bodyParser.urlencoded();

app.use(cors());
app.use(express.json());
app.use("/assets", express.static("./static/assets"));
app.set("view engine", "ejs")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nyantekyiwaa100",
  database: "spend",
})

// Connection to database
connection.connect((err)=>{
  if(err) throw err
  else console.log("Connected Successfully")
})

app.get("/", (req, res)=>{
  const q = "SELECT * FROM product";
  var data = connection.query(q, (err, data)=>{
    return data;
  });

  res.render("pages/index", {title: "Home", products: data})
})

app.get("/login", (req, res)=>{
  res.render("pages/login", {title: "Login"})
})

app.post("/login", (req, res)=>{

  const q = `select * from user where email = ? and user_password = ?;`;
  connection.query(q, [req.body.email, req.body.password], (err, data) => {
    console.log(data);
    if (err) return res.send(err);
    return res.redirect("/");
  });

})

app.get("/details", (req, res)=>{
  const q = "SELECT title, imageURL, price, description FROM product";

  db.query(q, (err, data)=>{
    if(err){
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  })
})

app.listen(3000, ()=>{
    console.log("Connected to backend");
})