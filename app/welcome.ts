import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ResponseHandler from './response-handler';

export const MESSAGE_WELCOME_MESSAGE = 'Hello! Welcome To MadeWLove';
function welcomeMessage(request: Request, response: Response) {
  ResponseHandler.SuccessResponse(
    response,
    StatusCodes.OK,
    MESSAGE_WELCOME_MESSAGE,
  );
}

export default welcomeMessage;
