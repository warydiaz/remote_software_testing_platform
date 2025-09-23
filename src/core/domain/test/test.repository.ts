import { TestEntity } from './test.entity';
import { TestId } from './id';

export interface TestRepository {
  save(test: TestEntity): Promise<void>;
  findById(id: TestId): Promise<TestEntity | undefined>;
  findAll(): Promise<TestEntity[]>;
  deleteById(id: TestId): Promise<void>;
  update(test: TestEntity): Promise<void>;
  findByName(name: string): Promise<TestEntity | undefined>;
}

export const TEST_REPOSITORY = Symbol('TestRepository');
