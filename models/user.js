const { Schema, model } = require("mongoose")
const {handleMongooseError} = require("../helpers")
const Joi = require("joi")

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    token: {
        type: String,
        default: null,
    },
}, { varsionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    // .unique()
    password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    // .unique()
    password: Joi.string().min(6).required()
})

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
})

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    emailSchema
}

const User = model("user", userSchema)

module.exports = {
    User,
    schemas
}
