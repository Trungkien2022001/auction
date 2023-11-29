import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestCounterMiddleware implements NestMiddleware {
  private requestsPerSecond: number = 0;
  private requestsPerMinute: number = 0;

  use(req: any, res: any, next: () => void) {
    // Ghi lại request
    this.requestsPerSecond++;
    this.requestsPerMinute++;

    // Log thông tin hoặc lưu vào database nếu cần
    console.log(`Requests per second: ${this.requestsPerSecond}`);
    console.log(`Requests per minute: ${this.requestsPerMinute}`);

    // Reset số lượng requests mỗi giây
    setTimeout(() => {
      this.requestsPerSecond = 0;
    }, 1000);

    // Reset số lượng requests mỗi phút
    setTimeout(() => {
      this.requestsPerMinute = 0;
    }, 60 * 1000);

    // Tiếp tục xử lý request
    next();
  }
}
