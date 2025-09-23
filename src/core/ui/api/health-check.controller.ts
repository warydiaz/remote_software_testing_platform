import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@Controller()
export class HealthCheckController {
  @Get('/')
  @SkipThrottle()
  getHealth(): string {
    return 'OK';
  }
}
