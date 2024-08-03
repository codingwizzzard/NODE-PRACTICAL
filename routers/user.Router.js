const { Router } = require("express");
const { register, login, logout, loginPage, registerPage } = require("../controllers/user.controller");

const user_router = Router()

user_router.post('/register', register)
user_router.get('/register',registerPage)
user_router.post('/login', login)
user_router.get('/login',loginPage)
user_router.get('/logout', logout)

module.exports = user_router