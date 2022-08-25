import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import ResponseHandler from '../../response-handler';
import ProductData from '../../../products.json';

class BasketController {
  public addToBasket = async (
    { body }: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('basket.json', 'utf8') || '[]';
      const parsed = JSON.parse(content);
      const filter = ProductData.find((value) => value.name === body.name);
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
   request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('basket.json', 'utf8') || '[]';
      const parsed = JSON.parse(content);
      return ResponseHandler.SuccessResponse(
        response,
        StatusCodes.OK,
        'get basket',
        { basket: parsed },
      );
    } catch (e) {
      return next(e);
    }
  };

  public deleteFromBasket = async (
    { params }: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('basket.json', 'utf8');
      const parsed = JSON.parse(content);
      const filter = parsed.filter(
        (value: { name: string }) => value.name !== params.name,
      );
      const abandoned = parsed.filter(
        (value: { name: string }) => value.name === params.name,
      );
      fs.writeFileSync('abandoned-items.json', JSON.stringify(abandoned));
      fs.writeFileSync('basket.json', JSON.stringify(filter));
      return ResponseHandler.CreatedResponse(
        response,
        `${params.name} removed from basket`,
      );
    } catch (e) {
      return next(e);
    }
  };

  public getAbandonedItemsInBasket = async (
  request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const content = fs.readFileSync('abandoned-items.json', 'utf8') || '[]';
      const parsed = JSON.parse(content);
      return ResponseHandler.SuccessResponse(
        response,
        StatusCodes.OK,
        'get abandoned items in basket',
        { abandonedItems: parsed },
      );
    } catch (e) {
      return next(e);
    }
  };
}
export default BasketController;
