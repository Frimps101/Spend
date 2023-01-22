import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/assets", express.static("./static/assets"));
app.set("view engine", "ejs")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spendDb",
})

app.get("/", (req, res)=>{
    res.render("pages/index", {title: "Home"})
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

app.listen(8800, ()=>{
    console.log("Connected to backend");
})