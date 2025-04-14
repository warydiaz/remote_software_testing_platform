import { Inject, Injectable } from '@nestjs/common';
import {
  PROFESSIONAL_PROFILE_REPOSITORY,
  ProfessionalProfileRepository,
} from '../../domain/professional-profile/professional-profile.repository';
import { ExperienceEntity } from '../../domain/professional-profile/experience.entity';

@Injectable()
export class GetExperienceHandler {
  constructor(
    @Inject(PROFESSIONAL_PROFILE_REPOSITORY)
    private readonly repository: ProfessionalProfileRepository,
  ) {}

  async handle(): Promise<ExperienceEntity[]> {
    return await this.repository.findAllExperiences();
  }
}
