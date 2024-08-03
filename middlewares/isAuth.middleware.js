const jwt = require('jsonwebtoken')
const userDB = require('../models/user.Schema')

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (token) {
            let decoded = jwt.verify(token, 'private-key')
            const user = await userDB.findById(decoded.id)

            if (user) {
                req.user = user
                next()
            } else {
                return res.redirect('/login')
            }
        } else {
            return res.redirect('/login')
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = isAuth