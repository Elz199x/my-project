import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponseToGateWayType, StatusHttpServiceEnum } from './global.type';

export const errorToHttpResponse = <T>(error: unknown, statusCode: HttpStatus): ResponseToGateWayType<T> => {
  let errorMessage = 'An unknown error occurred';
  let errorCode = HttpStatus.INTERNAL_SERVER_ERROR;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': 
        errorMessage = `Unique constraint failed on field(s): ${error.meta?.target}`;
        errorCode = HttpStatus.BAD_REQUEST;
        break;
      case 'P2025': 
        errorMessage = 'Record not found';
        errorCode = HttpStatus.NOT_FOUND;
        break;
      case 'P2003': 
        errorMessage = `Foreign key constraint failed on field: ${error.meta?.field_name}`;
        errorCode = HttpStatus.BAD_REQUEST;
        break;
      case 'P2016': 
        errorMessage = 'Query interpretation error';
        errorCode = HttpStatus.BAD_REQUEST;
        break;
      default:
        errorMessage = error.message;
        errorCode = HttpStatus.BAD_REQUEST;
        break;
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    errorMessage = 'An unknown error occurred with the database';
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    errorMessage = 'A database panic occurred';
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    errorMessage = 'Failed to initialize database connection';
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    errorMessage = 'Validation error occurred';
    errorCode = HttpStatus.BAD_REQUEST;
  } else if (error instanceof Error) {
    errorMessage = error.message || 'table base query have problem';
    errorCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  return {
    value: undefined,
    code: errorCode,
    status: StatusHttpServiceEnum.Error,
    text: `Error: ${errorMessage}`,

  };
};
