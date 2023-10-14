import { StatusCodes } from "http-status-codes";
class BadRequest extends Error {
    message;
    statusCode = StatusCodes.BAD_REQUEST;
    constructor(message) {
        super(message);
        this.message = message;
        this.message = message;
    }
}
export default BadRequest;
