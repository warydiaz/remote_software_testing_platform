import { Inject, Injectable } from '@nestjs/common';
import {
  PROFESSIONAL_PROFILE_REPOSITORY,
  ProfessionalProfileRepository,
} from '../../domain/professional-profile/professional-profile.repository';
import { InterestEntity } from '../../domain/professional-profile/interest.entity';

@Injectable()
export class GetInterestHandler {
  constructor(
    @Inject(PROFESSIONAL_PROFILE_REPOSITORY)
    private readonly repository: ProfessionalProfileRepository,
  ) {}

  async handle(): Promise<InterestEntity[]> {
    return await this.repository.findAllInterests();
  }
}
