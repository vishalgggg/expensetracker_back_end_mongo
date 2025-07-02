const express = require('express')
const fs = require('fs')
const path = require('path')

// importing middlewares 
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')

// configuring env
require('dotenv').config()

// importing routes
const authRoutes = require('./routes/authRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const premiumRoutes = require('./routes/premiumRoutes')

// importing database
const db = require('./util/database')

// importing models 
// const userModel = require('./models/userModel')
// const expenseModel = require('./models/expenseModel')
// const orderModel = require("./models/orderModel")
// const forgotPwdModel = require('./models/forgotPassowrdModel')
// const downloadExpensesModel = require('./models/donwloadExpensesModel')
const mongoConnect = require('./util/database').mongoConnect;

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
const app = express()



// applying middlewares
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))

//applying routes
app.use('/auth', authRoutes)
app.use('/user', expenseRoutes)
app.use('/payment', paymentRoutes)
app.use('/premium', premiumRoutes)

// associations
// userModel.hasMany(expenseModel)
// expenseModel.belongsTo(userModel)
// userModel.hasMany(orderModel)
// orderModel.belongsTo(userModel)
// userModel.hasMany(forgotPwdModel)
// forgotPwdModel.belongsTo(userModel)
// userModel.hasMany(downloadExpensesModel)
// downloadExpensesModel.belongsTo(userModel)

// sync database and listen
mongoConnect(() => {
  app.listen(process.env.RUNNING_PORT);
});

// app.listen(process.env.RUNNING_PORT, () => {
// console.log('App Started ..')
// })






