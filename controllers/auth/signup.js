const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jimp = require("jimp");
const { sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require('uuid');

const { User } = require("../../models/index")

const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`Email ${email} already in use`)
    }

    const verificationToken = uuidv4();

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    jimp.read(`${avatarURL}`)
        .then(avatar => {
            return avatar.resize(250, 250)
        })
        .catch(err => {
            console.error(err);
    });

    const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });
    const mail = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="http://localhost:3000/api//users/verify/${verificationToken}">Click here to verify your email</a>`
    }
    await sendEmail(mail);
    
    res.status(201).json({
        Status: "Created",
        ResponseBody: {
            user: {
                email,
                subscription,
                avatarURL,
                verificationToken
            }
        }
    })
}

module.exports = {
    signup
}