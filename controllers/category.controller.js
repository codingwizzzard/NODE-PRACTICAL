const categoryModel = require("../models/category.Schema")


exports.addCatPage = (req, res) => {
    return res.render('addCategory', { user: req.user })
}

exports.addCat = async (req, res) => {
    try {
        await categoryModel.create(req.body)
        return res.redirect('/')
    } catch (error) {
        return res.send(error.message)
    }
}