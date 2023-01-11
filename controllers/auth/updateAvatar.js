const fs = require("fs/promises")
const path = require("path")

const Jimp = require('jimp')

const { User } = require("../../models/user")

const avatarDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {

    const { path: tempUpload, originalname } = req.file
    const { _id } = req.user
    const filename = `${_id}_${originalname}`
    console.log("filename", `${filename}`)
    const resultUpload = path.join(avatarDir, filename)
    console.log("resultUpload", `small-${resultUpload}`)

//     Jimp.read(filename , (_, name) => {
//         name
//             .resize(256, 256)
//             .write(`${filename}-small-bw.jpg`);
// });
    // const image = await Jimp.read(resultUpload)
    // console.log("image", image)


    // async function resize () {
    //     image.resize(256, 256)
    //     image.write(`${filename}-small-bw.jpg`)
    //     console.log(image)
    //     return image
    // }
    // resize()
    

    await fs.rename(tempUpload, resultUpload)

    const image = await Jimp.read(resultUpload)
        .then(avatar => {
            return avatar
            .resize(250, 250) // resize
            .write(`public/avatars/small-${filename}`); // save
        })
        .catch(err => {
            console.error(err);
        });
    
    console.log("image", `${image}`)

    const avatarURL = path.join("avatars", `small-${filename}`)
    console.log("avatarURL", `${avatarURL}`)
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.json({
        avatarURL
    })
}

module.exports = updateAvatar
