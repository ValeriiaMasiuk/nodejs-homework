const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jimp = require("jimp")

const { User } = require("../../models/index")

const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`Email ${email} already in use`)
    }

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    jimp.read(`${avatarURL}`)
        .then(avatar => {
            return avatar.resize(250, 250)
        })
        .catch(err => {
            console.error(err);
    });

    const result = await User.create({ email, password: hashPassword, subscription, avatarURL });
    res.status(201).json({
        Status: "Created",
        ResponseBody: {
            user: {
                email,
                subscription,
                avatarURL
            }
        }
    })
}

module.exports = {
    signup
}