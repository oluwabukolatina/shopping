import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../http-exception';
import logger from '../logger';
import ResponseHandler from '../response-handler';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const hasError = error && error.message;
  const message = hasError ? error.message.toString() : 'Something went wrong';
  const err = error.error || null;
  logger.error(
    `BODY- ${JSON.stringify(
      request.body,
    )}, STATUS - ${status}, MESSAGE - ${message}, URL - ${
      request.originalUrl
    }, METHOD - ${request.method}, IP - ${request.ip}`,
  );

  if (status === StatusCodes.BAD_REQUEST) {
    return ResponseHandler.BadRequestResponse(response, message, err);
  }
  if (status === StatusCodes.NOT_FOUND) {
    return ResponseHandler.NotFoundResponse(response, message);
  }
  return ResponseHandler.ServerErrorResponse(response, status, message, err);
}

export default errorMiddleware;
