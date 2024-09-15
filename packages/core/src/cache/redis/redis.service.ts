import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(); // Kết nối đến Redis server, có thể cung cấp thêm cấu hình nếu cần
  }

  async cachedExecute(
    {
      key,
      ttl = 60,
      json = false,
    }: { key: string; ttl?: number; json?: boolean },
    fn: any
  ): Promise<any> {
    const time = ttl;
    if (!(typeof time === 'number') && !(typeof time === 'string')) {
      throw new TypeError(
        `expecting ttl to be number (second) or string, got ${typeof time}`
      );
    }

    const cached = await this.redis.get(key);
    if (!cached) {
      Logger.log(`Cache Miss! Key: ${key}`);
      const val = typeof fn === 'function' ? await fn() : await fn;
      this.redis.set(key, json ? JSON.stringify(val) : val, 'EX', time);

      return val;
    } else {
      Logger.log(`Cache Hit! Key: ${key}`);
    }

    return json ? JSON.parse(cached) : cached;
  }
  async setWorkingKey(key: string, ttl: number = 60 * 1000): Promise<boolean> {
    const res = await this.redis.call('set', key, '1', 'nx', 'px', ttl);

    Logger.log(`Working Key: ${key}, TTL: ${ttl}, Status: ${res}`);

    return res === 'OK';
  }
  async flushKeysByPattern(pattern: string, forced?: boolean) {
    const pipeline = this.redis.pipeline();
    const keys = await this.redis.keys(forced ? `*${pattern}*` : `${pattern}*`);
    keys.forEach((key) => {
      pipeline.del(key);
    });
    Logger.log(
      `flushKeysByPattern! Key: ${pattern}, Total key: ${keys.length}`
    );
    const results = await pipeline.exec();
    const deletedCount = results?.filter(
      ([error, result]) => !error && result === 1
    ).length;
    return deletedCount;
  }
  async set(key: string, data: any, expireTime?: any): Promise<'OK'> {
    return this.redis.set(key, data, 'EX', expireTime);
  }

  async setJSON(key: string, data: any, expireTime?: any): Promise<'OK'> {
    return this.redis.set(key, JSON.stringify(data), 'EX', expireTime);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async getJSON(key: string): Promise<string> {
    const rawData = await this.redis.get(key);
    return this.tryParseJson(rawData);
  }

  async hset(
    key: string,
    fields: string,
    value: string | number
  ): Promise<number> {
    return this.redis.hset(key, fields, value);
  }

  async hget(key: string, fields: string): Promise<string | null> {
    return this.redis.hget(key, fields);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return this.redis.hgetall(key);
  }

  async expire(key: string, expireTime: number): Promise<number> {
    return this.redis.expire(key, expireTime);
  }

  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async delMany(key: string[]): Promise<number> {
    return this.redis.del(key);
  }

  async addMembers(key: string, value: string): Promise<number> {
    return this.redis.sadd(key, value);
  }

  async sisMember(key: string, value: string): Promise<number> {
    return this.redis.sismember(key, value);
  }

  async zrem(key: string, value: any): Promise<number> {
    return this.redis.zrem(key, value);
  }

  async pipeLine(): Promise<any> {
    return this.redis.pipeline();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tryParseJson(params: any): object | any {
    if (params && Array.isArray(params)) {
      return params.map(this.tryParseJson);
    }
    if (params && typeof params === 'object') {
      Object.keys(params).forEach((key) => {
        params[key] = this.tryParseJson(params[key]);
      });

      return params;
    }

    let tempVal;
    try {
      tempVal = JSON.parse(params);
    } catch (error) {
      tempVal = params;
    }

    return tempVal;
  }
}
