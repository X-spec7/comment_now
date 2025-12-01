import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION } from './common/constants/version.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version(API_VERSION.V1)
  getHello(): string {
    return this.appService.getHello();
  }
}
