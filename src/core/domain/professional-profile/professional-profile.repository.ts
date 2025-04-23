import { ExperienceEntity } from './experience.entity';
import { InterestEntity } from './interest.entity';

export interface ProfessionalProfileRepository {
  findAllExperiences(): Promise<ExperienceEntity[]>;
  findAllInterests(): Promise<InterestEntity[]>;
  getNonExistingInterestIds(interests: number[]): Promise<number[]>;
  finExperienceLevel(level: number): Promise<number | null>;
}

export const PROFESSIONAL_PROFILE_REPOSITORY = Symbol(
  'ProfessionalProfileRepository',
);
