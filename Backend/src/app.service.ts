import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AHP API is running';
  }

  health() {
    return {
      status: 'ok',
      service: 'ahp-api',
      timestamp: new Date().toISOString(),
    };
  }
}
