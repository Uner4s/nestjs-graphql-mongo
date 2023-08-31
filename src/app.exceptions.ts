import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

import { ServerErrorTypeEnum } from './enum.types';

@Catch()
export class AppExceptionFilter implements GqlExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    console.log(gqlHost); // do not delete

    const globalResponseError =
      exception?.getResponse &&
      (exception?.getResponse() as Record<string, any>);

    // console.log('ERROR GLOBAL', exception)

    // Different error handling
    if (!globalResponseError) return exception;

    if (
      globalResponseError?.errorOrigin === ServerErrorTypeEnum.integration_error
    ) {
      const { title, description, errorLog, additional } = globalResponseError;
      const errorToString = JSON.stringify(errorLog);
      const objectData = JSON.stringify(additional);

      const params = {
        title,
        description,
        errorToString,
        objectData,
      };

      // sendErrorEmail(params)

      return exception;
    }

    if (
      globalResponseError?.errorOrigin === ServerErrorTypeEnum.internal_error
    ) {
      const { title, errorLog } = globalResponseError;
      const errorToString = JSON.stringify(errorLog);

      const params = {
        title,

        errorToString,
      };

      try {
        // Send email
        //   await sendErrorEmail(to, subject, html)
      } catch (error) {
        // nothing
      }

      return exception;
    }

    // Sometimes image bucket generate problems
    const { message } = globalResponseError;

    for (const key of ['GET', 'jpg', 'png'])
      if (!message?.includes(key)) return exception;

    return exception;
  }
}
