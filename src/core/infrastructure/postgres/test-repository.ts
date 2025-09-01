import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestRepository } from '../../domain/test/test.repository';
import { TestEntity } from '../../domain/test/test.entity';
import { TestId } from '../../domain/test/id';
import { TestPersistenceEntity } from './entities/test.persistence.entity';
import { TestStepPersistenceEntity } from './entities/test-step.persistence.entity';
import { TestStep } from '../../domain/test/testStep';

@Injectable()
export class TestTypeOrmRepository implements TestRepository {
  constructor(
    @InjectRepository(TestPersistenceEntity)
    private readonly testRepo: Repository<TestPersistenceEntity>,
    @InjectRepository(TestStepPersistenceEntity)
    private readonly stepRepo: Repository<TestStepPersistenceEntity>,
  ) {}

  async save(test: TestEntity): Promise<void> {
    const dbTest = new TestPersistenceEntity();
    dbTest.id = test.id.value;
    dbTest.tester = { id: test.testerId.value } as any; // Assuming tester is a relation
    dbTest.title = test.title.value;
    dbTest.description = test.description.value;
    dbTest.priority = test.priority.value;
    dbTest.isAutomated = test.isAutomated;
    dbTest.isRegression = test.isRegression;
    dbTest.requirement = test.requirement.value;
    dbTest.sprint = test.sprint.value;
    dbTest.expectedResult = test.expectedResult;

    if (test.isExploratory) {
      dbTest.testType = 'exploratory';
      dbTest.steps = [];
    } else if (this.isWithSteps(test)) {
      dbTest.testType = 'with_steps';
      dbTest.steps = test.steps.map((s) => {
        const step = new TestStepPersistenceEntity();
        step.stepDescription = s.description;
        step.expectedResult = s.expectedResult;
        step.stepOrder = s.order;
        return step;
      });
    } else {
      dbTest.testType = 'without_steps';
      dbTest.steps = [];
    }

    await this.testRepo.save(dbTest);
  }

  async update(test: TestEntity): Promise<void> {
    await this.save(test);
  }

  async deleteById(id: TestId): Promise<void> {
    await this.testRepo.delete({ id: id.value });
  }

  async findById(id: TestId): Promise<TestEntity | undefined> {
    const dbTest = await this.testRepo.findOne({
      where: { id: id.value },
      relations: ['steps'],
    });
    return dbTest ? this.toDomain(dbTest) : undefined;
  }

  async findByName(name: string): Promise<TestEntity | undefined> {
    const dbTest = await this.testRepo.findOne({
      where: { title: name },
      relations: ['steps'],
    });
    return dbTest ? this.toDomain(dbTest) : undefined;
  }

  async findAll(): Promise<TestEntity[]> {
    const dbTests = await this.testRepo.find({ relations: ['steps'] });
    return dbTests.map(this.toDomain);
  }

  private toDomain = (db: TestPersistenceEntity): TestEntity => {
    if (db.testType === 'exploratory') {
      return TestEntity.createExploratory(
        db.id.toString(),
        db.tester.id.toString(),
        db.title,
        db.description,
        db.priority,
        db.isAutomated,
        db.isRegression,
        db.requirement,
        db.sprint,
      );
    }

    if (db.testType === 'with_steps') {
      const steps: TestStep[] =
        db.steps?.map(
          (s) =>
            new TestStep(
              TestId.create(s.id),
              s.stepOrder,
              s.stepDescription,
              s.expectedResult,
            ),
        ) ?? [];

      return TestEntity.createWithSteps(
        db.id.toString(),
        db.tester.id.toString(),
        db.title,
        db.description,
        db.priority,
        db.isAutomated,
        db.isRegression,
        db.requirement,
        db.sprint,
        steps,
      );
    }

    return TestEntity.createWithoutSteps(
      db.id.toString(),
      db.tester.id.toString(),
      db.title,
      db.description,
      db.priority,
      db.isAutomated,
      db.isRegression,
      db.requirement,
      db.sprint,
      db.expectedResult!,
    );
  };

  private isWithSteps(test: TestEntity): boolean {
    return !test.steps || test.steps.length > 0;
  }
}
