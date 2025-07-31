/* eslint-disable @typescript-eslint/unbound-method */
import { CountryEntity } from '../../domain/location/country.entity';
import { LocationRepository } from '../../domain/location/location.repository';
import { GetCountriesHandler } from './get-countries-command-handler';

describe('GetCountriesHandler', () => {
  let handler: GetCountriesHandler;
  let repository: jest.Mocked<LocationRepository>;

  beforeEach(() => {
    repository = {
      findAllCountries: jest.fn(),
    } as unknown as jest.Mocked<LocationRepository>;

    handler = new GetCountriesHandler(repository);
  });

  it('should return all countries from repository', async () => {
    const countries: CountryEntity[] = [
      {
        id: '1',
        code: 'US',
        name: 'United States',
      } as unknown as CountryEntity,
      { id: '2', code: 'ES', name: 'Spain' } as unknown as CountryEntity,
    ];

    repository.findAllCountries.mockResolvedValue(countries);

    const result = await handler.handle();

    expect(repository.findAllCountries).toHaveBeenCalledTimes(1);
    expect(result).toEqual(countries);
  });
});
