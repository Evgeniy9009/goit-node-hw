const {Contact}  = require("../../models/contact")

const getAll = async (req, res, next) => {
    const {_id: owner} = req.user
    const { page = 1, limit = 10, favorite} = req.query
    const skip = (page - 1) * limit
    // owner
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit, favorite })
                                .populate("owner", "name email")
    res.json(result)

}

module.exports = getAll