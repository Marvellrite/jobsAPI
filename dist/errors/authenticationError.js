import { StatusCodes } from "http-status-codes";
class authenticationError extends Error {
    message;
    statusCode = StatusCodes.UNAUTHORIZED;
    constructor(message) {
        super(message);
        this.message = message;
        this.message = message;
    }
}
export default authenticationError;
