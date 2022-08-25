import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../../../http-exception';

const BasketMiddleware = {
  async checkIfProductToBeDeletedIsInBasket(
    { params }: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const basket = fs.readFileSync('basket.json', 'utf8') || '[]';
      const parsed = JSON.parse(basket);

      const find = parsed?.filter(
        (value: { name: string }) => value.name === params.name,
      );
      if (find.length > 0) return next();
      return next(
        new HttpException(StatusCodes.NOT_FOUND, 'product not in cart'),
      );
    } catch (e) {
      return next(e);
    }
  },
  async checkIfBasketIsEmpty(
    { params }: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const basket = fs.readFileSync('basket.json', 'utf8') || '[]';
      const parsed = JSON.parse(basket);

      if (parsed.length > 0) return next();
      return next(
        new HttpException(
          StatusCodes.BAD_REQUEST,
          'there are no products not in cart',
        ),
      );
    } catch (e) {
      return next(e);
    }
  },
};
export default BasketMiddleware;
