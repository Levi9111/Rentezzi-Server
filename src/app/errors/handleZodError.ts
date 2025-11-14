import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map(
    (issue: ZodIssue): TErrorSources[number] => {
      const lastPathSegment = issue.path[issue.path.length - 1];

      let path: string | number = '';
      if (
        typeof lastPathSegment === 'string' ||
        typeof lastPathSegment === 'number'
      ) {
        path = lastPathSegment;
      }

      return {
        path,
        message: issue.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
