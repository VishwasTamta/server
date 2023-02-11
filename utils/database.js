const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://vishwas:vishu7mongodb@cluster0.4wgsokt.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Mongodb Connected!");
      callback();
      _db = client.db();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
