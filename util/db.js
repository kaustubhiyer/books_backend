const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv");

let _db;

dotenv.config();

const mongoConnect = (cb) => {
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      console.log("connected");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DB found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
