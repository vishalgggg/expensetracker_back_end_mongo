// const sequelize = require('../util/database')
// const Sequelize = require('sequelize')

// const orderModel = sequelize.define("orders", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,

//     },
//     paymentId: Sequelize.STRING,
//     orderId: Sequelize.STRING,
//     status: Sequelize.STRING,


// })

// module.exports = orderModel
const getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');
class orderModel{
    static addOrderData(orderData){
        const db = getDb();
        return db
          .collection('Order')
          .insertOne(orderData)
          .then(result => {
            console.log('orderData inserted');
            return result;
          })
          .catch(err => {
            console.log(err);
          });
      }
      static findById(id){
 
        const db = getDb();
        return db
          .collection('Order')
          .find({ orderId: id })
          .then(result=> {
            return result;
          })
          .catch(err => {
            console.log(err);
          });
      }
      static update(id,status){
        const db = getDb();
        return db
          .collection('Order')
          .updateOne(
            { orderId: id },
            { $set: { status: status } }
          )
          .then(result => {
            console.log('Order status updated');
            return result;
          })
          .catch(err => {
            console.log(err);
          });
      }
}
module.exports = orderModel;