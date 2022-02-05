import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
/**
 * This is a wrapper for the RequestHandler to remove the boiler plate for all the try-catch statements
 * @param fn 
 * @returns 
 */
const tryCatchWrapper = (
    fn: (
        arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        arg1: Response<any, Record<string, any>>,
        arg2: NextFunction
    ) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
};
export default tryCatchWrapper;
