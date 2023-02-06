const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const {BadRequest} = require("http-errors")

const repeatEmailVerification = async (req, res) => {
    const { email } = req.body;
    const { verificationToken } = req.params;
    const user = await User.findOne({ email });

    if (user.verify) {
        throw BadRequest("Verification has already been passed")
    }

    const mail = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="http://localhost:3000/api//users/verify/${verificationToken}">Click here to verify your email</a>`
    }
    await sendEmail(mail);

    res.status(200).json({
        message: "Verification email sent",
        data: {
            email
        }
  });
}

module.exports = {
    repeatEmailVerification
}