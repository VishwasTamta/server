const mongodb = require("mongodb");
const { getDb } = require("../utils/database");

const ObjectId = mongodb.ObjectId;
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(() => console.log("User Created!"))
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
