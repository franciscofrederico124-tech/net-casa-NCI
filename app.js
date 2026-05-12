const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.json());

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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`
====================================
🚀 Servidor iniciado

http://localhost:${PORT}
====================================
  `);

});