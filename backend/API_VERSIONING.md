# API Versioning Guide

This document explains how API versioning is implemented in this backend application.

## Overview

The backend uses URI-based versioning with the format `/v{version}/{endpoint}`. This allows for clear separation of API versions and backward compatibility.

## Version Structure

### Current Versions
- **v1**: Current stable version (default)
- **v2**: Future version with enhanced features

### URL Format
```
/v1/auth/login          # Version 1 authentication
/v2/health              # Version 2 health check
```

## Implementation Details

### 1. Global Versioning Configuration
Versioning is enabled in `main.ts`:
```typescript
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
  prefix: 'v',
});
```

### 2. Controller Versioning
Controllers are versioned using the `@Version()` decorator:
```typescript
@Controller('auth')
@Version(API_VERSION.V1)
export class AuthController {
  // ...
}
```

### 3. Directory Structure
```
src/
├── v1/                 # Version 1 modules
│   ├── auth/
│   ├── users/
│   ├── articles/
│   ├── comments/
│   └── invitations/
├── v2/                 # Version 2 modules
│   └── health/
└── common/             # Shared utilities
```

### 4. Response Versioning
All API responses include version information in the `meta` field:
```json
{
  "success": true,
  "data": {...},
  "message": "Success",
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "v1",
    "requestId": "uuid"
  }
}
```

## Migration Guide

### For Developers

#### Creating a New Version
1. Create a new version directory: `src/v{n}/`
2. Copy existing modules to the new version
3. Update imports to use relative paths to `../../common/`
4. Add version decorator to controllers
5. Update the version module to include new modules
6. Add the version module to `app.module.ts`

#### Example: Creating v2 Auth Module
```typescript
// src/v2/auth/auth.controller.ts
import { Controller, Version } from '@nestjs/common';
import { API_VERSION } from '../../common/constants/version.constants';

@Controller('auth')
@Version(API_VERSION.V2)
export class AuthV2Controller {
  // Enhanced v2 implementation
}
```

### For API Consumers

#### Version Selection
- **Default**: Requests without version prefix use v1
- **Explicit**: Use `/v1/` or `/v2/` prefix for specific versions
- **Backward Compatibility**: v1 endpoints remain available when v2 is released

#### Response Handling
Always check the `meta.version` field in responses to ensure you're using the expected API version.

## Best Practices

### 1. Version Lifecycle
- **v1**: Stable, production-ready
- **v2**: Development, testing, new features
- **Deprecation**: Announce deprecation 6 months before removal

### 2. Breaking Changes
- Major changes require a new version
- Minor changes can be added to existing versions
- Bug fixes can be applied to all supported versions

### 3. Documentation
- Document all changes between versions
- Provide migration guides for breaking changes
- Maintain changelog for each version

### 4. Testing
- Test all versions independently
- Ensure backward compatibility
- Validate response format consistency

## Constants

Version constants are defined in `src/common/constants/version.constants.ts`:
```typescript
export const API_VERSION = {
  V1: '1',
  V2: '2',
} as const;

export const CURRENT_API_VERSION = API_VERSION.V1;
export const SUPPORTED_VERSIONS = [API_VERSION.V1, API_VERSION.V2];
```

## Examples

### Version 1 Endpoints
```
GET  /v1/               # App info
POST /v1/auth/login     # User login
GET  /v1/users          # Get users
```

### Version 2 Endpoints
```
GET  /v2/health         # Health check
GET  /v2/health/detailed # Detailed health
```

### Default (v1) Endpoints
```
GET  /                  # App info (defaults to v1)
POST /auth/login        # User login (defaults to v1)
GET  /users             # Get users (defaults to v1)
```

## Future Considerations

1. **Header-based Versioning**: Consider adding `Accept-Version` header support
2. **Version Deprecation**: Implement deprecation warnings in responses
3. **Version Discovery**: Add endpoint to list available versions
4. **Analytics**: Track version usage for deprecation planning

