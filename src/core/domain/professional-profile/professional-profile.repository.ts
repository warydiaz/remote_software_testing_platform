import { ExperienceEntity } from './experience.entity';
import { InterestEntity } from './interest.entity';

export interface ProfessionalProfileRepository {
  findAllExperiences(): Promise<ExperienceEntity[]>;
  findAllInterests(): Promise<InterestEntity[]>;
}

export const PROFESSIONAL_PROFILE_REPOSITORY = Symbol(
  'ProfessionalProfileRepository',
);
