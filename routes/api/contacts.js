const express = require("express")
const {schemas} = require("../../models/contact")

const { Contact } = require("../../models/contact")

const {isValidId} = require("../../middlewares")

const { HttpError } = require("../../helpers")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt")
    res.json(result)
    console.log(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)

    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, "missing required name field")
      // throw HttpError(400, error.message)
    }
    const result = await Contact.create(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete("/:contactId", isValidId,  async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result){
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "Contact deleted"
    })

  } catch (error) {
    next(error)
  }
})

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
