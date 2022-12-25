const express = require("express")

const schemas = require("../../schemas/contacts")

const {isValidId, validateBody} = require("../../middlewares")

const ctrl = require("../../controllers/contacts")

const { ctrlWrapper } = require("../../helpers")



const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById))

router.post("/", validateBody(schemas.addSchema), ctrl.add)

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById) )

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateById))

router.patch("/:contactId/favorite", validateBody(schemas.addSchema), isValidId, ctrlWrapper(ctrl.updateFavorite))

module.exports = router
