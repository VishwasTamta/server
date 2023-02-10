const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const ShopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //Giving access for public folder

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(ShopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true }) // remove for development
  // make tables according to the models defined
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Vishwas", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    user.createCart();
  })
  .then((cart) => {
    app.listen(3030);
  })
  .catch((err) => console.log(err));
