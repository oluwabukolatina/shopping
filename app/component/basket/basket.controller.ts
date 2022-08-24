import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import ResponseHandler from '../../../response-handler';
import ProductData from '../../../products.json';
import { StatusCodes } from 'http-status-codes';

class BasketController {
  public addToBasket = async (
    { body }: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('basket.json', 'utf8') || '[]';
      console.log(content, 'thec');
      const parsed = JSON.parse(content);
      console.log(parsed, 'th pa');
      const filter = ProductData.find((value) => value.name === body.name);
      console.log(filter, 'fil');
      parsed.push(filter);
      const data = JSON.stringify(parsed);
      fs.writeFileSync('basket.json', data);
      return ResponseHandler.CreatedResponse(
        response,
        `${body.name} added to basket`,
      );
    } catch (e) {
      return next(e);
    }
  };
  public getAllInBasket = async (
    { body }: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('basket.json', 'utf8') || '[]';
      const parsed = JSON.parse(content);
      return ResponseHandler.SuccessResponse(
        response,
        StatusCodes.OK,
        `get basket`,
        { basket: parsed },
      );
    } catch (e) {
      return next(e);
    }
  };
}
export default BasketController;
