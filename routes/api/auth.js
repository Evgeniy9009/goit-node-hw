const express = require("express")

const ctrl = require("../../controllers/auth")

const {schemas} = require("../../models/contact")

const router = express.Router()

// signup
// router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

module.exports = router