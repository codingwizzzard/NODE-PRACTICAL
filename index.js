const express = require('express')
const db = require('./config/database')
const user_router = require('./routers/user.Router')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const task_router = require('./routers/task.router')
const catRouter = require('./routers/category.router')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname + "/public")))
app.use(express.static(path.join(__dirname + "/partials")))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(user_router)
app.use(task_router)
app.use(catRouter)

app.listen(1303, (err) => {
    db()
    if (err) {
        console.log(err)
    }
    console.log("server started at http://localhost:1303")
})