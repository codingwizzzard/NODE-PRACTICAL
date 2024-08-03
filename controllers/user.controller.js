const bcrypt = require('bcrypt')
const userDB = require('../models/user.Schema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body
        const hashpassword = await bcrypt.hash(password, 10)
        await userDB.create({ username, email, password: hashpassword, role })
        return res.status(200).redirect('/login')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userDB.findOne({ username: username })

        if (!user) {
            return res.redirect('back')
        }

        const isMatch = bcrypt.compare(password, user.password)

        if (isMatch) {
            let payload = {
                id: user._id,
                username: user.username,
                role: user.role
            }

            let token = jwt.sign(payload, "private-key")
            res.cookie("token", token).redirect("/")
        } else {
            return res.status(400).redirect('back')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token')
    return res.redirect("/login")
}

exports.loginPage = (req, res) => {
    return res.render("./login")
}

exports.registerPage = (req, res) => {
    return res.render('./register')
}