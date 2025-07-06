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
static async findOne( ids ){
  const db = await getDb();
  return await db
    .collection('forgotPassword')
    .findOne({ id:ids })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
static async update(ids){
  const db = await getDb();
  return await db
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
static async addForgotPwd(forgotData){
  const db = await getDb();
  return await db
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