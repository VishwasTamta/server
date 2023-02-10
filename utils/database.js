const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://vishwas:vishu7mongodb@cluster0.4wgsokt.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Mongodb Connected!");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
