import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from './http-exception';
import SharedHelper from './shared-helper';

class ResponseHandler {
  static HttpExceptionResponse(
    next: NextFunction,
    code: number,
    message: string,
    data?: any,
  ) {
    return next(new HttpException(code, SharedHelper.titleCase(message), data));
  }

  static ErrorResponse(
    res: Response,
    code: number,
    message: string,
    data?: any,
  ) {
    return res
      .status(code)
      .json({ message: SharedHelper.titleCase(message), status: false, data });
  }

  static JoiErrorResponse(
    res: Response,
    code: number,
    data: any,
    message: string,
  ) {
    return res.status(code).json({ status: false, message, data });
  }

  static SuccessResponse(
    response: Response,
    code: number,
    message = '',
    data?: any,
  ) {
    return response
      .status(code)
      .json({ status: true, message: SharedHelper.titleCase(message), data });
  }

  static CreatedResponse(res: Response, message = '') {
    return res
      .status(StatusCodes.CREATED)
      .json({ message: SharedHelper.titleCase(message), status: true });
  }

  static ServerErrorResponse(
    res: Response,
    code?: any,
    message?: string,
    error?: any,
    data?: any,
  ) {
    return res.status(code).json({
      message: SharedHelper.titleCase(`server message: -${message} `),
      status: false,
      data,
      error,
    });
  }

  static BadRequestResponse(
    res: Response,
    message: string,
    error?: any,
    data?: any,
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: SharedHelper.titleCase(message),
      error,
      data,
    });
  }

  static NotFoundResponse(res: Response, message: string) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ status: false, message: SharedHelper.titleCase(message) });
  }
}

export default ResponseHandler;
