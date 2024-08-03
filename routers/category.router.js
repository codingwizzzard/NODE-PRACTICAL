const { Router } = require("express");
const { addCatPage, addCat } = require("../controllers/category.controller");

const catRouter = Router()

catRouter.get('/add', addCatPage)
catRouter.post('/add', addCat)

module.exports = catRouter