const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTbl'
    }
})

const taskModel = mongoose.model('taskTbl', taskSchema)

module.exports = taskModel