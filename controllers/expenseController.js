const expenseModel = require('../models/expenseModel')
// const sequelize = require("../util/database")
const userModel = require('../models/userModel')
// const getDb = require('../util/database').getDb;
const expenseController = {
    // when user add some expense 
    addExpense: async (req, res) => {
        const { date, name, price, category } = req.body
        const { userEmail, totalTransaction } = req.user
       
        try {
            // crating the transaction object 
            
            
            const addedExpense =  new expenseModel(date, name, price, category, userEmail )
            await addedExpense.save();
            const oldTransactions = Number(totalTransaction)
            const currAmount = Number(price)
            await userModel.update(req.user.userEmail, { totalTransaction:  oldTransactions + currAmount } )
            const expenseObj = {"date":addedExpense.date, "name": addedExpense.name, "price": addedExpense.price, "category": addedExpense.category, "userEmail": addedExpense.userEmail, "_id": addedExpense._id }
            // const updateTotalTransaction = await userModel.update( userEmail,oldTransactions + currAmount )
            res.send({ status: "Success",expense:expenseObj, id: addedExpense.userEmail, totalTransaction: oldTransactions + currAmount })
            
        } catch (error) {
            console.log(error)
            
            res.status(400).send({ message: "error try again !" })
        }
    },


    // when user want to fecth all expenses 
    getExpense: async (req, res) => {
        const { rowsperpage, page } = req.query
        const { userEmail,  isPremiumUser, totalTransaction } = req.user
        try {
            if (userEmail ) {
                const allExpenses = await expenseModel.findByEmail(userEmail)
                const startIndex = (page - 1) * rowsperpage
                const endIndex = page * rowsperpage
                const slicedExpense = allExpenses.slice(startIndex, endIndex)
                const userExpenses = {
                    expenses: slicedExpense,
                    expensesLength: allExpenses.length,
                    isPremiumUser,
                    totalTransaction
                }
                res.send(userExpenses)

            }
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "error while getting the expenses" })
        }
    },


    // when user want to delete his/her expense 
    deleteExpense: async (req, res) => {
        const id = req.body.id
        
        try {
            if (id) {
                // crating the transaction objec
                const findedExpenses = await expenseModel.findByField('_id', id)
                await expenseModel.deleteById(id)
                // const findedExpenses = await expenseModel.findOne({ where: { id: id } })
                const totalTransaction = Number(req.user.totalTransaction)
                const expenseAmount = Number(findedExpenses.price)
                // const deletedRes = await findedExpenses.destroy()
                await userModel.update(req.user.userEmail, { totalTransaction:  totalTransaction -expenseAmount  } )
                res.send({ status: "Delete Success", id: id })
                
            }
        } catch (error) {
           
            res.status(400).send({ message: "Error while deleting the expense" })
        }
    }

}



module.exports = expenseController

