import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express-serve-static-core"

const notFound = (req: Request, res: Response)=>{
    res.status(StatusCodes.NOT_FOUND).send({message: "Not Found Yet"})

}

export default notFound;