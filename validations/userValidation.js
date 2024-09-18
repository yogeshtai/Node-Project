import Joi from "joi";

const createUser = (req, res, next) => {
    const UserValidate = Joi.object({
        firstName: Joi.string().empty().trim().required(),
        lastName: Joi.string().empty().trim().required(),
        email: Joi.string().empty().min(5).trim().email().required(),
        phoneNumber: Joi.string().trim().length(10).pattern(/^[0-9]+$/),
    }).options({ allowUnknown: true });
    const error = UserValidate.validate(req.body);
    if (error.error)
        return res.status(400).json({
            success: false,
            message: error.error.details[0].message.toString(),
            error: error.error.details[0].message.toString()
        });
    next();
};

export {
    createUser
};