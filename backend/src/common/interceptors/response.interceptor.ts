import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBuilder } from '../utils/response-builder.util';
import { ApiResponse } from '../interfaces/api-response.interface';
import { CURRENT_API_VERSION } from '../constants/version.constants';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] || ResponseBuilder['generateRequestId']();
    
    // Extract version from URL or use current version
    const url = request.url;
    const versionMatch = url.match(/\/v(\d+)\//);
    const apiVersion = versionMatch ? versionMatch[1] : CURRENT_API_VERSION;

    return next.handle().pipe(
      map((data) => {
        // If the response is already in ApiResponse format, return as is
        if (data && typeof data === 'object' && 'success' in data) {
          return {
            ...data,
            meta: {
              ...data.meta,
              version: `v${apiVersion}`,
            },
          };
        }

        // If it's a simple message string, wrap it
        if (typeof data === 'string') {
          return ResponseBuilder.success(null, data, { 
            requestId,
            version: `v${apiVersion}`,
          });
        }

        // If it's an object with message property, extract message and data
        if (data && typeof data === 'object' && 'message' in data) {
          const { message, ...responseData } = data;
          return ResponseBuilder.success(
            Object.keys(responseData).length > 0 ? responseData : null,
            message,
            { 
              requestId,
              version: `v${apiVersion}`,
            }
          );
        }

        // Default success response
        return ResponseBuilder.success(data, 'Operation completed successfully', { 
          requestId,
          version: `v${apiVersion}`,
        });
      }),
    );
  }
}
