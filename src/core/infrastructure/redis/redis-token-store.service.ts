import { TokenStorePort } from '../../application/ports/token-store.port';
import { RedisService } from './redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisTokenStore implements TokenStorePort {
  constructor(private readonly redisService: RedisService) {}

  async save(userId: string, token: string, timeStore?: number): Promise<void> {
    await this.redisService.set(
      `auth_token:${userId}`,
      token,
      'EX',
      timeStore ?? 3600,
    );
    await this.redisService.set(
      `token:${token}`,
      userId,
      'EX',
      timeStore ?? 3600,
    );
  }
  async invalidate(token: string): Promise<void> {
    const key = `token:${token}`;
    await this.redisService.del(key);
  }

  async getUserIdFromToken(token: string): Promise<string | null> {
    const key = `token:${token}`;
    return this.redisService.get(key);
  }
}
