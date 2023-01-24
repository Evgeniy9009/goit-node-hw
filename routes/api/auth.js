const express = require("express")

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, authenticate, upload , passport} = require("../../middlewares")

const {schemas} = require("../../models/user")

const router = express.Router()

router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"]
}))

router.get("/google/callback", passport.authenticate("google", {session: false}), ctrlWrapper(ctrl.google))

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify))

router.post("/verify", validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail))


// singin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.patch("/:_id/subscription", authenticate,validateBody(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription))

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router