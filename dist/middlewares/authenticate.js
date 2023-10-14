import authenticationError from "../errors/authenticationError.js";
import Jwt from "jsonwebtoken";
const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer"))
        throw new authenticationError("Not Authorized");
    const token = authorization.split(" ")[1];
    try {
        const payload = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        throw new authenticationError("Not Authorized");
    }
};
export default authenticate;
