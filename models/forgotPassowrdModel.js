// const sequelize = require('../util/database')
// const Sequelize = require('sequelize')


// const forgotPasswordModel = sequelize.define('forgotpwdrequest', {
//     isActive: Sequelize.BOOLEAN,
//     id: {
//         type: Sequelize.STRING,
//         primaryKey: true
//     },

// })
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class forgotPasswordModel{
static findOne( ids ){
  const db = getDb();
  return db
    .collection('forgotPassword')
    .findOne({ id:ids })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
static update(ids){
  const db = getDb();
  return db
    .collection('forgotPassword')
    .updateOne({ id: ids }, { $set: { isActive: false } })
    .then(result => {
      console.log('Forgot password data updated');
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
static addForgotPwd(forgotData){
  const db = getDb();
  return db
    .collection('forgotPassword')
    .insertOne(forgotData)
    .then(result => {
      console.log('Forgot password data inserted');
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
}
module.exports = forgotPasswordModel