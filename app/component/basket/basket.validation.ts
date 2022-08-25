import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import AppValidation from '../../app.validation';
import HttpException from '../../http-exception';

const BasketValidation = {
  async validateAddToBasket(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      name: Joi.string().label('product name').required(),
    });
    await AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async checkIfNameOfProductToBeDeletedIsAvailableInParams(
    { params }: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (params.name) return next();

    return next(
      new HttpException(
        StatusCodes.BAD_REQUEST,
        'name of product to be deleted is required',
      ),
    );
  },
};
export default BasketValidation;
