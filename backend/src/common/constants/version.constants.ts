export const API_VERSION = {
  V1: '1',
  V2: '2',
} as const;

export const CURRENT_API_VERSION = API_VERSION.V1;

export const SUPPORTED_VERSIONS = [API_VERSION.V1, API_VERSION.V2];

export type ApiVersion = typeof API_VERSION[keyof typeof API_VERSION];

