import { StatusCodes } from "http-status-codes";

class authenticationError extends Error {
    private statusCode = StatusCodes.UNAUTHORIZED;

    constructor(public message: string){
        super(message);
        this.message = message;
    }
}

export default authenticationError;