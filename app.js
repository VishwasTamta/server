const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const ShopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");
const { mongoConnect } = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //Giving access for public folder

app.use((req, res, next) => {
  next();
});

app.use("/admin", adminRoutes);
app.use(ShopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  console.log("Running on port 3030");
  app.listen(3030);
});
