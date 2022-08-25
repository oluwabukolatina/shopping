import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../../http-exception';
import {
  PRODUCT_DOES_NOT_EXIST,
  PRODUCT_NOT_IN_BASKET,
} from './basket.message';

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
        new HttpException(StatusCodes.NOT_FOUND, PRODUCT_NOT_IN_BASKET),
      );
    } catch (e) {
      return next(e);
    }
  },
  async checkIfBasketIsEmpty(
    request: Request,
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
  async doesNotAddNonExistentItemToBasket(
    { body }: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const products = fs.readFileSync('products.json', 'utf8') || '[]';
      const parsed = JSON.parse(products);
      const find = parsed?.filter(
        (value: { name: string }) => value.name === body.name,
      );
      if (find.length > 0) return next();
      return next(
        new HttpException(StatusCodes.NOT_FOUND, PRODUCT_DOES_NOT_EXIST),
      );
    } catch (e) {
      return next(e);
    }
  },
};
export default BasketMiddleware;
