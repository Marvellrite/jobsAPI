import  authenticationError  from "../errors/authenticationError.js";
import { routeHandlerFunction as rhf } from "types";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JwtPayloadV1 } from "../types.js";

const authenticate: rhf = async(req, res, next)=>{
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith("Bearer")) throw new authenticationError("Not Authorized");

    const token = authorization.split(" ")[1];

    try {
       const payload = Jwt.verify(token, process.env.JWT_SECRET!);
       req.user = payload as JwtPayloadV1;
       next!();
    } catch (error) {
        throw new authenticationError("Not Authorized");
    }
}

export default authenticate;