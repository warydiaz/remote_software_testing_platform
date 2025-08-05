import { UserEntity } from './user.entity';
import { Email } from '../email';

export interface UserRepository {
  findByEmail(email: Email): Promise<UserEntity | undefined>;
  findByUserId(userId: string): Promise<UserEntity | undefined>;
}
export const USER_REPOSITORY = Symbol('UserRepository');
