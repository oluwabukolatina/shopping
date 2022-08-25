import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from './http-exception';
import SharedHelper from './shared-helper';

const AppValidation = {
  /**
   * joi validation
   * @param schema
   * @param req
   * @param res
   * @param next
   */
  async bodyBaseValidator(
    schema: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      req.body = await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      return next(
        new HttpException(
          StatusCodes.BAD_REQUEST,
          SharedHelper.replaceValue(error.message, /["]/gi, ''),
        ),
      );
    }
  },
};
export default AppValidation;
