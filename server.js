import express from "express";
import mysql from "mysql";
import cors from "cors";
import CircularJSON from "circular-json";


const app = express();

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
  //let result = {}
  connection.query(q, (err, data)=>{
    for(var i in data){
      console.log(data[i].title);
    }
    //console.log(data);
    // let result = Object.values(JSON.parse(JSON.stringify(data)));
    // console.log(typeof result)
    // result.forEach((v) => console.log(v));
    res.render("pages/index", {title: "Home", products: data})
  });

  //let result = CircularJSON.stringify(data);
  //console.log(result);
  //let result = Object.values(JSON.parse(JSON.stringify(data)));
  // res.render("pages/index", {title: "Home", products: data})
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

app.get("/details/:id", (req, res)=>{
  const id = req.params.id;
  console.log(id)

  const q = `SELECT title, imageURL, price, description FROM product WHERE id=${id}`;
  //console.log(q);

  connection.query(q, (err, data)=>{
    if(err){
      console.log(err);
      return res.json(err);
    }
    // return res.json(data);
    console.log(data);
    res.render("pages/product-details", {title: "Product Details", products: data})
  })
})


app.get("/products", (req, res)=>{
  const q =  `SELECT * FROM product`;

  connection.query(q, (err, data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.render("pages/products", {title: "Products", products: data})
  })
})




app.listen(8800, ()=>{
    console.log("Connected to backend");
})