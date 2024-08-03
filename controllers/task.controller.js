const categoryModel = require("../models/category.Schema");
const taskModel = require("../models/task.Schema");

const home = async (req, res) => {
    try {
        let tasks = await taskModel.find({}).populate('category')
        console.log(tasks)
        res.render('taskList', { tasks, user: req.user });
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
}

const addPage = async (req, res) => {
    let categories = await categoryModel.find({})
    res.render('taskForm', { task: null, user: req.user, categories })
}

const insertData = async (req, res) => {
    const { title, description, category, id } = req.body;
    try {
        if (id) {
            await taskModel.findByIdAndUpdate(id, { title, description, category });
        } else {
            await taskModel.create({ title, description, category });
        }
        res.redirect('/');
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
};

const deleteData = async (req, res) => {
    let { id } = req.params;
    try {
        await taskModel.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
};

const editData = async (req, res) => {
    let { id } = req.params;
    try {
        let task = await taskModel.findById(id);
        const categories = await categoryModel.find({})
        res.render('taskForm', { task, user: req.user, categories });
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
};

module.exports = { home, insertData, deleteData, editData, addPage };