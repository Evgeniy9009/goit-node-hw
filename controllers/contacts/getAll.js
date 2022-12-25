const { Contact } = require("../../models/contact")


const getAll = async (req, res, next) => {

    const result = await Contact.find({}, "-createdAt")
    res.json(result)
    console.log(result)
}

module.exports = getAll