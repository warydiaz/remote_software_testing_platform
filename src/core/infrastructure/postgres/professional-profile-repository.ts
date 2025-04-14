import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionalProfileRepository } from 'src/core/domain/professional-profile/professional-profile.repository';
import { ExperiencePersistenceEntity } from './entities/experience.persistence.entity';
import { ExperienceEntity } from 'src/core/domain/professional-profile/experience.entity';
import { InterestPersistenceEntity } from './entities/interest.persistence.entity';
import { InterestEntity } from 'src/core/domain/professional-profile/interest.entity';

@Injectable()
export class ProfessionalProfileTypeOrmRepository
  implements ProfessionalProfileRepository
{
  constructor(
    @InjectRepository(ExperiencePersistenceEntity)
    private readonly repositoryExperience: Repository<ExperienceEntity>,
    @InjectRepository(InterestPersistenceEntity)
    private readonly repositoryInterests: Repository<InterestEntity>,
  ) {}

  async findAllExperiences(): Promise<ExperienceEntity[]> {
    const dbExperiences = await this.repositoryExperience.find();
    return dbExperiences ? this.toDomainExperiences(dbExperiences) : [];
  }

  async findAllInterests(): Promise<InterestEntity[]> {
    const dbInterests = await this.repositoryInterests.find();
    return dbInterests ? this.toDomainInterests(dbInterests) : [];
  }

  private toDomainInterests(
    dbInterests: InterestPersistenceEntity[],
  ): InterestEntity[] {
    return dbInterests.map((dbInterest) =>
      ExperienceEntity.create(dbInterest.id, dbInterest.description),
    );
  }

  private toDomainExperiences(
    dbExperiences: ExperiencePersistenceEntity[],
  ): ExperienceEntity[] {
    return dbExperiences.map((dbExperience) =>
      ExperienceEntity.create(dbExperience.id, dbExperience.description),
    );
  }
}
