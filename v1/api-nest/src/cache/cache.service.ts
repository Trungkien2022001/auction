import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import ms from 'ms';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(); // Kết nối đến Redis server, có thể cung cấp thêm cấu hình nếu cần
  }

  async cachedExecute({ key, ttl = 60, json = false }, fn) {
    let time = ttl;
    if (!(typeof time === 'number') && !(typeof time === 'string')) {
      throw new TypeError(
        `Expecting ttl to be number (second) or string, got ${typeof time}`,
      );
    }

    if (typeof time === 'string') {
      time = ms(time) / 1000;
    }

    const cached = await this.redis.get(key);
    if (!cached) {
      const val = await fn();
      this.redis.set(key, json ? JSON.stringify(val) : val, 'EX', time);

      return val;
    }

    return json ? JSON.parse(cached) : cached;
  }
}
