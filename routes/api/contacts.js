const express = require("express")

const ctrl = require("../../controllers/contacts")

const { ctrlWrapper } = require("../../helpers")

const {isValidId, validateBody, authenticate} = require("../../middlewares")

const {schemas} = require("../../models/contact")

const router = express.Router()


router.get("/", authenticate, ctrlWrapper(ctrl.getAll))

router.get("/:contactId", authenticate,  isValidId, ctrlWrapper(ctrl.getById))

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add)

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.deleteById) )

router.put("/:contactId", authenticate, validateBody(schemas.addSchema), isValidId, ctrlWrapper(ctrl.updateById))

router.patch("/:contactId/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), isValidId, ctrlWrapper(ctrl.updateFavorite))

module.exports = router
