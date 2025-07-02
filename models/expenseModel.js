
const getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');
// const expenseModel = sequelize.define("expenses", {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,

//     },
//     date: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// })
class expenseModel{
    constructor(date, name, price, category, userEmail){
        this.date = date
        this.name = name
        this.price = price
        this.category = category
        this.userEmail = userEmail
    }
    save() {
    const db = getDb();
    return db.collection('expense').insertOne(this);
  }
static findByField(field, value) {
  const db = getDb();
  let query = {};
  if (field === '_id') {
    query[field] = new ObjectId(value);
  } else {
    query[field] = value;
  }
  return db
    .collection('expense')
    .findOne(query)
    .then(user => {
      return user;
    })
    .catch(err => {
      console.log(err);
    });
}
  static deleteById(expenseId) {
    const db = getDb();
    return db
        .collection('expense')
        .deleteOne({ _id: new ObjectId(expenseId) })
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
}

  static findByEmail(userEmail){
 
  const db = getDb();
  return db
    .collection('expense')
    .find({ userEmail: userEmail })
    .toArray()
    .then(expenses => {
      return expenses;
    })
    .catch(err => {
      console.log(err);
    });
}
}

module.exports = expenseModel