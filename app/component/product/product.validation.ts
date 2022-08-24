import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../../app.validation';

const ProductValidation = {
  async validateAddToBasket(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      name: Joi.string().label('User Id').required(),
    });
    await AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default ProductValidation;
