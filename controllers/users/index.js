const { getCurrent } = require('./getCurrent');
const { updateSubscription } = require('./updateSubscription');
const { updateAvatar } = require('./updateAvatar');
const { verifyEmail } = require('./verifyEmail');
const { repeatEmailVerification } = require('./repeatEmailVerification')

module.exports = {
    getCurrent,
    updateSubscription,
    updateAvatar,
    verifyEmail,
    repeatEmailVerification
}