import { Request, Response, ErrorRequestHandler, NextFunction } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";


interface RequestV1 extends Request {
    user?: { userName: string, userID: number | string};
}


export interface ErrorRequestHandlerV1 extends ErrorRequestHandler {
    [key: string]: string | number | object;
}

export interface routeHandlerFunction {
    (req: RequestV1, res: Response, next?: NextFunction): Promise<void>
}

export interface errorHandlerType {
    (err: ErrorRequestHandlerV1, req: RequestV1, res: Response, next: NextFunction): void
}

export interface JwtPayloadV1 extends JwtPayload {
    userID: string | number,
    userName: string
}

