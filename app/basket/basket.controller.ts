import { NextFunction, Request, Response } from 'express';

class BasketController {
  public addToCheckout = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {};
}
export default BasketController;
