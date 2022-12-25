const Joi = require("joi")

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    addSchema,
    updateFavoriteSchema
}

module.exports = schemas