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
    //console.log(data);
    for(let product in data){
      console.log(data[product].title)
    }
    res.render("pages/products", {title: "Products", products: data})
  })
})


// GET Add Product
app.get("/products/add", (req, res)=>{
  const q = "INSERT INTO product(`title`, `imageURL`, `price`, `description`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.imageURL,
    req.body.price,
    req.body.description,
  ];


  connection.query(q, [values], (err, data)=>{
    if(err){
      console.log(err);
    }
    
      console.log(data)
    res.render("pages/add-product", {title: "Add Product"})
  })
})


// POST Add Product
app.post("/products/add", (req, res)=>{
  const q = "INSERT INTO product(`title`, `imageURL`, `price`, `description`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.imageURL,
    req.body.price,
    req.body.description,
  ];


  connection.query(q, [values], (err, data)=>{
    if(err){
      console.log(err);
    }
    
      console.log(data)
    res.render("pages/add-product", {title: "Add Product"})
  })
})

// GET Edit Product
app.get("/products/edit/:id", (req, res)=>{
  const productId = req.params.id;

  res.render("pages/edit-product", {title: "Edit Product"})

  const q =  "UPDATE product SET `title`= ?, `imageURL`= ?, `price`= ?, `description`= ? WHERE id = ?";

  // connection.query(q, [...values, productId], (err, data)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(data);
  //   res.render("pages/product-details", {title: "Edit Product", products: data})
  // })
})


// PUT Edit Product
app.put("/products/edit/:id", (req, res)=>{
  const productId = req.params.id;

  res.render("pages/product-details")

  const q =  "UPDATE product SET `title`= ?, `imageURL`= ?, `price`= ?, `description`= ? WHERE id = ?";

  // connection.query(q, [...values, productId], (err, data)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(data);
  //   res.render("pages/product-details", {title: "Edit Product", products: data})
  // })
})

// Delete Product
app.delete("/delete/:id", (req, res) => {
  const productId = req.params.id;
  const q = " DELETE FROM product WHERE id = ? ";

  db.query(q, [productId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.listen(8800, ()=>{
    console.log("Connected to backend");
})