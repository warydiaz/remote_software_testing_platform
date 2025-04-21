import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TesterPersistenceEntity } from './entities/tester.persistence.entity';
import { TesterRepository } from '../../domain/tester/tester.repository';
import { TesterEntity } from '../../domain/tester/tester.entity';
import { Email } from 'src/core/domain/email';

@Injectable()
export class TesterTypeOrmRepository implements TesterRepository {
  constructor(
    @InjectRepository(TesterPersistenceEntity)
    private readonly repository: Repository<TesterPersistenceEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async save(tester: TesterEntity): Promise<void> {
    const dbTester = new TesterPersistenceEntity();
    dbTester.id = tester.id.value;
    dbTester.name = tester.name.value;
    dbTester.surname = tester.surname.value;
    dbTester.email = tester.email.value;
    dbTester.birthDate = tester.birthDate.value;
    dbTester.languages = tester.language;
    dbTester.city = tester.city;
    dbTester.postalCode = tester.postalCode;
    dbTester.country = tester.country;
    dbTester.experienceLevel = tester.experienceLevel;
    dbTester.interests = tester.interests.map((i) => i);

    await this.repository.save(dbTester);
  }

  async findByEmail(email: Email): Promise<TesterEntity[]> {
    const dbTesters = await this.repository.find({
      where: { email: email.value },
    });

    return dbTesters.map(this.toDomain);
  }

  private toDomain = (dbTester: TesterPersistenceEntity): TesterEntity => {
    return TesterEntity.create(
      dbTester.id,
      dbTester.name,
      dbTester.surname,
      dbTester.email,
      dbTester.birthDate,
      dbTester.languages,
      dbTester.city,
      dbTester.postalCode,
      dbTester.country,
      dbTester.experienceLevel,
      dbTester.interests,
    );
  };
}
