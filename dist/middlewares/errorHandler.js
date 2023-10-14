import { StatusCodes } from "http-status-codes";
const errorHandler = (err, req, res, next) => {
    const customError = {
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500
    };
    if (err.name === "CastError") {
        customError.message = "Job Not Found";
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if (err.name === "ValidationError") {
        customError.message = `Enter Valid Values for ${Object.keys(err.errors).join(" ,")}`;
    }
    if (err.code === 11000) {
        customError.message = `A Duplicate Value of ${Object.values(err.keyValue).join(" ,")} already Exists`;
    }
    res.status(customError.statusCode).send({ message: customError.message });
    // res.status(customError.statusCode as number ).send({ err });
};
export default errorHandler;
