import { ExperienceEntity } from './experience.entity';
import { InterestEntity } from './interest.entity';

export interface LocationRepository {
  findAllExperience(): Promise<ExperienceEntity[]>;
  findAllInterest(): Promise<InterestEntity[]>;
}

export const PROFESSIONAL_PROFILE_REPOSITORY = Symbol(
  'ProfessionalProfileRepository',
);
