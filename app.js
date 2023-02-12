const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const ShopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");
const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //Giving access for public folder

app.use((req, res, next) => {
  User.findById("63e887a5b7fc162a7f79f818")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(ShopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://vishwas:vishu7mongodb@cluster0.4wgsokt.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Mongodb Connected");

    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Vishwas",
          email: "test@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3030);
  });
