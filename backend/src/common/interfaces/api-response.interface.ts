export interface ApiResponseMeta {
  timestamp: string;
  version: string;
  requestId: string;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
  meta?: ApiResponseMeta;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: ApiResponseMeta & {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Success response helper types
export interface SuccessResponse<T = any> extends ApiResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse extends ApiResponse {
  success: false;
  errors: string[];
}

// Common response data types
export interface UserResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  title?: string;
  bio?: string;
  address?: string;
  phone_number?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseData {
  user: UserResponseData;
  message: string;
}

export interface TokenResponseData {
  access_token: string;
  refresh_token: string;
}

// Response builder utility types
export type ResponseBuilder<T = any> = {
  success: (data: T, message: string, meta?: Partial<ApiResponseMeta>) => SuccessResponse<T>;
  error: (message: string, errors?: string[], meta?: Partial<ApiResponseMeta>) => ErrorResponse;
  paginated: <T>(
    data: T[],
    message: string,
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    meta?: Partial<ApiResponseMeta>
  ) => PaginatedResponse<T>;
};
