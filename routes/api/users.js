const express = require('express');
const { joiSubscriptionSchema} = require('../../models/user')

const router = express.Router();

const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/', auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.getCurrent));

router.patch('/avatars', auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', ctrlWrapper(ctrl.repeatEmailVerification))

module.exports = router;