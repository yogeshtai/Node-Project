import jwt from "jsonwebtoken";

const jsonToken = async (user) => {
    const token = jwt.sign({ _id: user?._id, role: user?.role }, process.env.JWTCODE)
    return { token };
};

const sanitizePhoneNumber = (phoneNumber) => {
    // return phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
    return phoneNumber.replace(/^\+1|\D/g, '');
};

export {
    jsonToken,
    sanitizePhoneNumber
};