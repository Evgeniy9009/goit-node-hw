const { User } = require("../../models/user")
const {HttpError} = require("../../helpers")

const verify = async (req, res) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) {
        throw HttpError(404)
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verify")
    }
    await User.findByIdAndUpdate(user._id, { ver: true, verificationToken: "" })
    
    res.json({
        message: "Email verify success"
    })
}

module.exports = verify