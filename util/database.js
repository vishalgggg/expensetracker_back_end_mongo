const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://vsoftjob184:Gunjan99@clustermongo.5s7quas.mongodb.net/?retryWrites=true&w=majority&appName=Clustermongo'
  )
    .then(client => {
      console.log('Connected! hai');
      _db = client.db('expense_manager');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
