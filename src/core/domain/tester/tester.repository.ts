import { Email } from '../email';
import { TesterEntity } from './tester.entity';

export interface TesterRepository {
  save(tester: TesterEntity): void;
  findByEmail(email: Email): Promise<TesterEntity[]>;
  findInterests(interests: number[]): Promise<number[]>;
  finExperienceLevel(level: number): Promise<number>;
}

export const TESTER_REPOSITORY = Symbol('TesterRepository');
