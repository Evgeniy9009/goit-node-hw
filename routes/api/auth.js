const express = require("express")

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, authenticate } = require("../../middlewares")

const {schemas} = require("../../models/user")

const router = express.Router()

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

// singin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.patch("/:_id/subscription", authenticate,validateBody(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription))


module.exports = router