/* eslint-disable @typescript-eslint/unbound-method */
import { LanguageEntity } from '../../domain/location/language.entity';
import { LocationRepository } from '../../domain/location/location.repository';
import { GetLanguagesHandler } from './get-languages-command-handler';

describe('GetLanguagesHandler', () => {
  let handler: GetLanguagesHandler;
  let repository: jest.Mocked<LocationRepository>;

  beforeEach(() => {
    repository = {
      findAllLanguages: jest.fn(),
    } as unknown as jest.Mocked<LocationRepository>;

    handler = new GetLanguagesHandler(repository);
  });

  it('should return all languages from repository', async () => {
    const languages: LanguageEntity[] = [
      { id: '1', code: 'en', name: 'English' } as unknown as LanguageEntity,
      { id: '2', code: 'es', name: 'Spanish' } as unknown as LanguageEntity,
    ];

    repository.findAllLanguages.mockResolvedValue(languages);

    const result = await handler.handle();

    expect(repository.findAllLanguages).toHaveBeenCalledTimes(1);
    expect(result).toEqual(languages);
  });
});
