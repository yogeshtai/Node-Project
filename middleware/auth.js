import jwt from "jsonwebtoken";

const tokenVerification = (req, res, next) => {
    var token = req.header('Authorization');
    if (!token) return res.status(400).json({ message: "Token is required", error: "User is not Login", data: null });
    try {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWTCODE, (err, decoded) => {
            req.user = decoded;
            if (err) return res.status(403).json({ message: "Invalid token" });
            next();
        })
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong", error: error });
    };
};

export {
    tokenVerification,
};