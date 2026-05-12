const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.json());

let systemBulb = {
  "on": false,
  "two": false,
}

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: false
  })
);

app.set("view engine", "handlebars");

app.set(
  "views",
  path.join(__dirname, "views")
);



app.get("/", (req, res) => {
  res.render("app");
});

app.get("/system/esp32", (req, res) => {
  return res.json(systemBulb);
})

app.post("/system/getstatus", (req, res) => {
  const { one, two } = req.body;
  
  console.log("Dados: ", req.body);
  systemBulb = {
    "one": one,
    "two": two,
  }
  
  return res.json({ success: true})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`
====================================
🚀 Servidor iniciado

http://localhost:${PORT}
====================================
  `);

});