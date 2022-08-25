import { NextFunction, Request, Response } from 'express';
import ProductData from '../../../products.json';
import ResponseHandler from '../../response-handler';
import { StatusCodes } from 'http-status-codes';

class ProductController {
  public get = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      return ResponseHandler.SuccessResponse(
        response,
        StatusCodes.OK,
        'fetched products',
        { products: ProductData },
      );
    } catch (e) {
      return next(e);
    }
  };
}
export default ProductController;
