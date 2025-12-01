export const APP_CONSTANTS = {
  // Cookie names
  COOKIES: {
    ACCESS_TOKEN: 'comment_now_access_token',
    REFRESH_TOKEN: 'comment_now_refresh_token',
  },

  // JWT Configuration
  JWT: {
    ACCESS_TOKEN_EXPIRES_IN: '15m',
    REFRESH_TOKEN_EXPIRES_IN: '7d',
    ACCESS_TOKEN_MAX_AGE: 15 * 60 * 1000, // 15 minutes in milliseconds
    REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },

  // User roles
  USER_ROLES: {
    ADMIN: 'admin',
    EXPERT: 'expert',
  },

  // User status
  USER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
  },

  // Password configuration
  PASSWORD: {
    MIN_LENGTH: 6,
    SALT_ROUNDS: 10,
  },

  // Cookie configuration
  COOKIE_CONFIG: {
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'strict' as const,
  },

  // API Configuration
  API: {
    VERSION: '1.0.0',
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },

  // Environment
  ENVIRONMENT: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
  },
} as const;

// Export individual constants for easier access
export const {
  COOKIES,
  JWT,
  USER_ROLES,
  USER_STATUS,
  PASSWORD,
  COOKIE_CONFIG,
  API,
  ENVIRONMENT,
} = APP_CONSTANTS;
