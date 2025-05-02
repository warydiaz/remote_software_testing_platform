import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TesterPersistenceEntity } from './entities/tester.persistence.entity';
import { TesterRepository } from '../../domain/tester/tester.repository';
import { TesterEntity } from '../../domain/tester/tester.entity';
import { Email } from 'src/core/domain/email';
import { UserPersistenceEntity } from './entities/user.persistence.entity';

@Injectable()
export class TesterTypeOrmRepository implements TesterRepository {
  constructor(
    @InjectRepository(TesterPersistenceEntity)
    private readonly testerRepository: Repository<TesterPersistenceEntity>,
    private readonly userRepository: Repository<UserPersistenceEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async save(tester: TesterEntity): Promise<void> {
    const user = new UserPersistenceEntity();
    user.id = tester.id.value;
    user.userId = tester.userId;
    user.email = tester.email.value;
    user.name = tester.name.value;
    user.surname = tester.surname.value;
    user.password = tester.password;

    await this.userRepository.save(user);

    const dbTester = new TesterPersistenceEntity();
    dbTester.id = tester.id.value;
    dbTester.birthDate = tester.birthDate.value;
    dbTester.languages = tester.language;
    dbTester.city = tester.city;
    dbTester.postalCode = tester.postalCode;
    dbTester.country = tester.country;
    dbTester.experienceLevel = tester.experienceLevel;
    dbTester.interests = tester.interests.map((i) => i);

    await this.testerRepository.save(dbTester);
  }

  async findByEmail(email: Email): Promise<TesterEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { email: email.value },
    });

    if (!dbUser) {
      return undefined;
    }
    const dbTesters = await this.testerRepository.find({
      where: { id: dbUser.id },
    });

    if (!dbTesters) {
      return undefined;
    }

    return this.testerToDomain(dbTesters[0], dbUser);
  }

  async findByUserId(userId: string): Promise<TesterEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!dbUser) {
      return undefined;
    }
    const dbTesters = await this.testerRepository.find({
      where: { id: dbUser.id },
    });

    if (!dbTesters) {
      return undefined;
    }

    return this.testerToDomain(dbTesters[0], dbUser);
  }

  private testerToDomain = (
    dbTester: TesterPersistenceEntity,
    dbUser: UserPersistenceEntity,
  ): TesterEntity => {
    return TesterEntity.create(
      dbUser.id,
      dbUser.name,
      dbUser.surname,
      dbUser.email,
      dbTester.birthDate,
      dbTester.languages,
      dbTester.city,
      dbTester.postalCode,
      dbTester.country,
      dbTester.experienceLevel,
      dbTester.interests,
      dbUser.userId,
      dbUser.password,
    );
  };
}
