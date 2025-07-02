// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const userModel = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true

//     },
//     userName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     userEmail: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     userPhone: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     userPwd: {
//         type: Sequelize.STRING,
//         allowNull: false

//     },
//     totalTransaction: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0,
//     },

//     isPremiumUser: Sequelize.BOOLEAN

// })
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, userEmail, userPhone, userPwd, totalTransaction = 0, isPremiumUser) {
    this.username = username;
    this.userEmail = userEmail;
    this.userPhone = userPhone;
    this.userPwd = userPwd;
    this.totalTransaction = totalTransaction;
    this.isPremiumUser = isPremiumUser;
  }
//  update(email,totalTransactions){
//   const db = getDb();
//   return db
//     .collection('users')
//     .updateOne(
//       { userEmail: email },
//       { $set: { totalTransaction: totalTransactions } }
//     )
//     .then(result => {
//       console.log('User transaction updated');
//       return result;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
}
static update(userId, updateObj){
  const db = getDb();
  return db
    .collection('users')
    .updateOne(
      { userEmail: userId },
      { $set:  updateObj}
    )
    .then(result => {
      console.log('User Details updated');
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
static findAll() {
  const db = getDb();
  return db
    .collection('users')
    .find({}, { projection: { username: 1, totalTransaction: 1, _id: 0 } })
    .toArray()
    .then(users => {
      return users;
    })
    .catch(err => {
      console.log(err);
    });
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
    .collection('users')
    .findOne(query)
    .then(user => {
      return user;
    })
    .catch(err => {
      console.log(err);
    });
}
// static findOne( ids ){
//   const db = getDb();
//   return db
//     .collection('users')
//     .findOne({ _id:new ObjectId(ids) })
//     .then(result => {
//       return result;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// static findByEmail(userEmail){
 
//   const db = getDb();
//   return db
//     .collection('users')
//     .findOne({ userEmail: userEmail })
//     .then(user => {
//       return user;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
 
  
//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
}
module.exports = User;
