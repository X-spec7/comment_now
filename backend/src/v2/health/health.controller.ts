import { Controller, Get, Version } from '@nestjs/common';
import { API_VERSION } from '../../common/constants/version.constants';

@Controller('health')
export class HealthController {
  @Get()
  @Version(API_VERSION.V2)
  getHealth() {
    return {
      status: 'ok',
      version: 'v2',
      timestamp: new Date().toISOString(),
      message: 'API v2 is healthy',
    };
  }

  @Get('detailed')
  @Version(API_VERSION.V2)
  getDetailedHealth() {
    return {
      status: 'ok',
      version: 'v2',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        cache: 'connected',
        external_apis: 'available',
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }
}
