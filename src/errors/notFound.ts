import { StatusCodes } from "http-status-codes";

class NotFound extends Error {
    private statusCode = StatusCodes.NOT_FOUND;

    constructor(public message: string){
        super(message);
        this.message = message;
    }
}

export default NotFound;