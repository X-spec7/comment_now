export const ERROR_MESSAGES = {
  // Authentication errors
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User with this email already exists',
    ACCOUNT_NOT_ACTIVE: 'Account is not active. Please contact administrator.',
    ACCOUNT_PENDING: 'Account is pending approval',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    TOKEN_EXPIRED: 'Token has expired',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    INSUFFICIENT_PERMISSIONS: 'Insufficient permissions to perform this action',
    ONLY_ADMIN_CAN_CREATE_ADMIN: 'Only administrators can create admin users',
    LOGOUT_FAILED: 'Logout failed',
    LOGIN_REQUIRED: 'Login required to access this resource',
  },

  // User errors
  USER: {
    PROFILE_NOT_FOUND: 'User profile not found',
    PROFILE_UPDATE_FAILED: 'Failed to update user profile',
    INVALID_USER_DATA: 'Invalid user data provided',
    USER_DELETION_FAILED: 'Failed to delete user',
    PASSWORD_TOO_WEAK: 'Password must be at least 6 characters long',
    EMAIL_ALREADY_IN_USE: 'Email address is already in use',
    INVALID_EMAIL_FORMAT: 'Invalid email format',
    INVALID_PHONE_FORMAT: 'Invalid phone number format',
  },

  // Validation errors
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_FORMAT: 'Invalid format',
    MIN_LENGTH: 'Minimum length not met',
    MAX_LENGTH: 'Maximum length exceeded',
    INVALID_EMAIL: 'Please provide a valid email address',
    INVALID_PASSWORD: 'Password must be at least 6 characters long',
    INVALID_ROLE: 'Invalid user role',
    INVALID_STATUS: 'Invalid user status',
  },

  // Database errors
  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    QUERY_FAILED: 'Database query failed',
    RECORD_NOT_FOUND: 'Record not found',
    DUPLICATE_ENTRY: 'Duplicate entry found',
    CONSTRAINT_VIOLATION: 'Database constraint violation',
  },

  // Server errors
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'Resource not found',
    METHOD_NOT_ALLOWED: 'Method not allowed',
    REQUEST_TIMEOUT: 'Request timeout',
    TOO_MANY_REQUESTS: 'Too many requests',
  },

  // File upload errors
  FILE: {
    UPLOAD_FAILED: 'File upload failed',
    INVALID_FILE_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File size too large',
    FILE_NOT_FOUND: 'File not found',
    FILE_DELETE_FAILED: 'Failed to delete file',
  },

  // Business logic errors
  BUSINESS: {
    OPERATION_NOT_ALLOWED: 'Operation not allowed',
    RESOURCE_LOCKED: 'Resource is locked',
    QUOTA_EXCEEDED: 'Quota exceeded',
    FEATURE_DISABLED: 'Feature is disabled',
    MAINTENANCE_MODE: 'System is under maintenance',
  },
} as const;

// Helper function to get nested error message
export const getErrorMessage = (path: string): string => {
  const keys = path.split('.');
  let current: any = ERROR_MESSAGES;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return 'Unknown error';
    }
  }
  
  return typeof current === 'string' ? current : 'Unknown error';
};

// Export individual error categories for easier access
export const {
  AUTH,
  USER,
  VALIDATION,
  DATABASE,
  SERVER,
  FILE,
  BUSINESS,
} = ERROR_MESSAGES;
