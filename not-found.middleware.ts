import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from "./http-exception";

function notFoundMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return next(
    new HttpException(
      StatusCodes.NOT_FOUND,
      `${request.originalUrl} does not exist`,
    ),
  );
}

export default notFoundMiddleware;
