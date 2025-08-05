/* eslint-disable @typescript-eslint/unbound-method */
import { ProfessionalProfileRepository } from '../../domain/professional-profile/professional-profile.repository';
import { ExperienceEntity } from '../../domain/professional-profile/experience.entity';
import { GetExperienceHandler } from './get-tester-experience-command-handler';

describe('GetExperienceHandler', () => {
  let handler: GetExperienceHandler;
  let repository: jest.Mocked<ProfessionalProfileRepository>;

  beforeEach(() => {
    repository = {
      findAllExperiences: jest.fn(),
    } as unknown as jest.Mocked<ProfessionalProfileRepository>;

    handler = new GetExperienceHandler(repository);
  });

  it('should return all experiences from repository', async () => {
    const experiences: ExperienceEntity[] = [
      {
        id: '1',
        company: 'Company A',
        position: 'Developer',
      } as unknown as ExperienceEntity,
      {
        id: '2',
        company: 'Company B',
        position: 'Manager',
      } as unknown as ExperienceEntity,
    ];

    repository.findAllExperiences.mockResolvedValue(experiences);

    const result = await handler.handle();

    expect(repository.findAllExperiences).toHaveBeenCalledTimes(1);
    expect(result).toEqual(experiences);
  });

  it('should return an empty array if repository has no experiences', async () => {
    repository.findAllExperiences.mockResolvedValue([]);

    const result = await handler.handle();

    expect(repository.findAllExperiences).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
