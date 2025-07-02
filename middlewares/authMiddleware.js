const userModel = require('../models/userModel')
const { decodeToken } = require('../helperFunctions')
const bcrypt = require('bcrypt')


const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (token) {
            const { email, password } = decodeToken(token)
     userModel.findByField('userEmail', email)
     .then(async(user) => {
      
      const verifyPwd = await bcrypt.compare(password, user.userPwd)
        if (verifyPwd) {
            req.user = new userModel(
                user.username,
                user.userEmail,
                user.userPhone,
                user.userPwd,
                user.totalTransaction,
                user.isPremiumUser
            )
            next()
        }
        else {
            res.status(400).send({ message: 'some error occured' })
        }
      
    })
    
            

        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: 'some error occured' })
    }
}


module.exports = authMiddleware