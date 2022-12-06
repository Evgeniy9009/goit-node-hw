const express = require("express")
const Joi = require("joi")

const contacts = require("../../models/contacts")

const { HttpError } = require("../../helpers")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(7).max(15).required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
    console.log(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)

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
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, "missing required name field")
      // throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
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

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const {contactId} = req.params
    const result = await contacts.updateContact(contactId, req.body)
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