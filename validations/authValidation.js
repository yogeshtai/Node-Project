import Joi from "joi";
import mongoose from "mongoose";

const isValidObjectId = (req, res, next) => {
    const _id = req?.params?._id;
    const validId = mongoose.Types.ObjectId.isValid(_id);
    if (!validId)
        return res.status(400).json({
            success: false,
            message: "Please enter a valid objectId",
            error: "Invalid objectId"
        });
    next();
};

const signUpValidator = (req, res, next) => {
    const signUpValidate = Joi.object({
        firstName: Joi.string().empty().trim().required(),
        lastName: Joi.string().empty().trim().required(),
        email: Joi.string().empty().min(5).trim().email().required(),
        // password: Joi.string().empty().min(7).required(), // Minimum 7 characters for the password
        // phoneNumber: Joi.string().trim().length(10).pattern(/^[0-9]+$/),
    }).options({ allowUnknown: true });
    const error = signUpValidate.validate(req.body);
    if (error.error)
        return res.status(400).json({
            success: false,
            message: error.error.details[0].message.toString(),
            error: error.error.details[0].message.toString()
        });
    next();
};

const checkExistence = (req, res, next) => {
    const existenceValidate = Joi.object({
        email: Joi.string().empty().min(5).trim().email().required(),
        // phoneNumber: Joi.string().trim().length(10).pattern(/^[0-9]+$/),
    }).options({ allowUnknown: true });
    const error = existenceValidate.validate(req.body);
    if (error.error)
        return res.status(400).json({
            success: false,
            message: error.error.details[0].message.toString(),
            error: error.error.details[0].message.toString()
        });
    next();
};

const updatePassValidator = (req, res, next) => {
    const updatePasswordValidate = Joi.object({
        password: Joi.string().empty().trim().max(500).required()
    });
    const error = updatePasswordValidate.validate(req.body);
    if (error.error)
        return res.status(400).json({
            success: false,
            message: error.error.details[0].message.toString(),
            error: error.error.details[0].message.toString()
        });
    next();
};

const signInValidator = (req, res, next) => {
    const signInValidate = Joi.object({
        email: Joi.string().empty().trim().max(500).required(),
        password: Joi.string().empty().trim().max(500).required(),
        // fcmToken: Joi.string().trim().max(500)
    });
    const error = signInValidate.validate(req.body);
    if (error.error)
        return res.status(400).json({
            success: false,
            message: "Invalid/ Missing credentials",
            error: error.error.details[0].message.toString()
        });
    next();
};


export {
    signUpValidator,
    isValidObjectId,
    signInValidator,
    checkExistence,
    updatePassValidator
};