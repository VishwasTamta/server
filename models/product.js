const { getDb } = require("../utils/database");
const mongodb = require("mongodb");

class Product {
  constructor(title, price, imageURL, description, _id) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    this._id = _id ? new mongodb.ObjectId(_id) : null;
  }

  save() {
    const db = getDb();
    let dbOpp = db;
    if (this._id) {
      dbOpp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOpp = db.collection("products").insertOne(this);
    }
    return dbOpp.then().catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(() => {
        console.log("Deleted one product!");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
