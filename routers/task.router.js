const { Router } = require("express");
const { insertData, deleteData, editData, home, addPage } = require("../controllers/task.controller");
const isAuth = require("../middlewares/isAuth.middleware");

const task_router = Router()

task_router.get('/', isAuth, home)

task_router.get('/addTasks', isAuth, addPage)
task_router.post('/addTasks', isAuth, insertData);

task_router.get('/delete/:id', isAuth, deleteData);

task_router.get('/edit/:id', isAuth, editData);

module.exports = task_router