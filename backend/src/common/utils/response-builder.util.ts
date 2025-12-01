import { v4 as uuidv4 } from 'uuid';
import { 
  ApiResponse, 
  SuccessResponse, 
  ErrorResponse, 
  PaginatedResponse, 
  ApiResponseMeta 
} from '../interfaces/api-response.interface';
import { API } from '../constants/app.constants';

export class ResponseBuilder {
  private static generateRequestId(): string {
    return uuidv4();
  }

  private static getBaseMeta(version?: string): ApiResponseMeta {
    return {
      timestamp: new Date().toISOString(),
      version: version || API.VERSION,
      requestId: this.generateRequestId(),
    };
  }

  static success<T>(
    data: T,
    message: string,
    meta?: Partial<ApiResponseMeta>
  ): SuccessResponse<T> {
    return {
      success: true,
      data,
      message,
      meta: {
        ...this.getBaseMeta(meta?.version),
        ...meta,
      } as ApiResponseMeta,
    };
  }

  static error(
    message: string,
    errors?: string[],
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return {
      success: false,
      message,
      errors: errors || [message],
      meta: {
        ...this.getBaseMeta(meta?.version),
        ...meta,
      } as ApiResponseMeta,
    };
  }

  static paginated<T>(
    data: T[],
    message: string,
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    meta?: Partial<ApiResponseMeta>
  ): PaginatedResponse<T> {
    return {
      success: true,
      data,
      message,
      meta: {
        ...this.getBaseMeta(meta?.version),
        ...meta,
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
      } as ApiResponseMeta & {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      },
    };
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully',
    meta?: Partial<ApiResponseMeta>
  ): SuccessResponse<T> {
    return this.success(data, message, meta);
  }

  static updated<T>(
    data: T,
    message: string = 'Resource updated successfully',
    meta?: Partial<ApiResponseMeta>
  ): SuccessResponse<T> {
    return this.success(data, message, meta);
  }

  static deleted(
    message: string = 'Resource deleted successfully',
    meta?: Partial<ApiResponseMeta>
  ): SuccessResponse<null> {
    return this.success(null, message, meta);
  }

  static notFound(
    message: string = 'Resource not found',
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return this.error(message, [message], meta);
  }

  static unauthorized(
    message: string = 'Unauthorized access',
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return this.error(message, [message], meta);
  }

  static forbidden(
    message: string = 'Insufficient permissions',
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return this.error(message, [message], meta);
  }

  static badRequest(
    message: string = 'Bad request',
    errors?: string[],
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return this.error(message, errors, meta);
  }

  static internalError(
    message: string = 'Internal server error',
    meta?: Partial<ApiResponseMeta>
  ): ErrorResponse {
    return this.error(message, [message], meta);
  }
}
