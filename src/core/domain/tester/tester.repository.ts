import { Email } from '../email';
import { TesterEntity } from './tester.entity';

export interface TesterRepository {
  save(tester: TesterEntity): Promise<void>;
  findByEmail(email: Email): Promise<TesterEntity | undefined>;
  findByUserId(userId: string): Promise<TesterEntity | undefined>;
}

export const TESTER_REPOSITORY = Symbol('TesterRepository');
