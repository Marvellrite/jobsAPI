import { StatusCodes } from "http-status-codes";

class BadRequest extends Error {
    private statusCode = StatusCodes.BAD_REQUEST;

    constructor(public message: string){
        super(message);
        this.message = message;
    }
}

export default BadRequest;