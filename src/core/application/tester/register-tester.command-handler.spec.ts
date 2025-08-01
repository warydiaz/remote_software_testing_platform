/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { RegisterTesterCommandHandler } from './register-tester.command-handler';
import { RegisterTesterCommand } from './register-tester.command';
import { TesterAlreadyExistsError } from './tester-already-exists.error';
import { LocationDoNotExistsError } from './location-do-not-exists.error';
import { ProfessionalProfileDoNotExistsError } from './professional-profile-do-not-exists.error';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('RegisterTesterCommandHandler', () => {
  let handler: RegisterTesterCommandHandler;
  let testerRepository: any;
  let locationRepository: any;
  let professionalProfileRepository: any;

  // UUID válido para el comando
  const validUuid = 'e8d3a740-8f8d-4a6b-b7fa-982a2693b4a5';

  const command = new RegisterTesterCommand(
    validUuid,
    'John',
    'Doe',
    'john@example.com',
    new Date('1990-01-01'),
    1,
    'City',
    '12345',
    2,
    3,
    [1, 2],
    'user123',
    'password123',
  );

  beforeEach(() => {
    testerRepository = {
      findByEmail: jest.fn(),
      findByUserId: jest.fn(),
      save: jest.fn(),
    };

    locationRepository = {
      findLanguageById: jest.fn(),
      findCountryById: jest.fn(),
    };

    professionalProfileRepository = {
      getNonExistingInterestIds: jest.fn(),
      finExperienceLevel: jest.fn(),
    };

    handler = new RegisterTesterCommandHandler(
      testerRepository,
      locationRepository,
      professionalProfileRepository,
    );

    process.env.SALT_ROUNDS = '10';
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
  });

  it('should throw TesterAlreadyExistsError if tester email already exists', async () => {
    testerRepository.findByEmail.mockResolvedValue({});

    await expect(handler.handle(command)).rejects.toThrow(
      TesterAlreadyExistsError.withEmail(command.email),
    );
  });

  it('should throw LocationDoNotExistsError if language does not exist', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(null);

    await expect(handler.handle(command)).rejects.toThrow(
      LocationDoNotExistsError.languageWithId(command.language),
    );
  });

  it('should throw LocationDoNotExistsError if country does not exist', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(true);
    locationRepository.findCountryById.mockResolvedValue(null);

    await expect(handler.handle(command)).rejects.toThrow(
      LocationDoNotExistsError.countryWithId(command.country),
    );
  });

  it('should throw ProfessionalProfileDoNotExistsError if interests do not exist', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(true);
    locationRepository.findCountryById.mockResolvedValue(true);
    professionalProfileRepository.getNonExistingInterestIds.mockResolvedValue([
      1,
    ]);

    await expect(handler.handle(command)).rejects.toThrow(
      ProfessionalProfileDoNotExistsError.interestWithId(command.interests),
    );
  });

  it('should throw ProfessionalProfileDoNotExistsError if experience level does not exist', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(true);
    locationRepository.findCountryById.mockResolvedValue(true);
    professionalProfileRepository.getNonExistingInterestIds.mockResolvedValue(
      [],
    );
    professionalProfileRepository.finExperienceLevel.mockResolvedValue(null);

    await expect(handler.handle(command)).rejects.toThrow(
      ProfessionalProfileDoNotExistsError.experienceLevelWithId(
        command.experience_level,
      ),
    );
  });

  it('should throw TesterAlreadyExistsError if userId already exists', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(true);
    locationRepository.findCountryById.mockResolvedValue(true);
    professionalProfileRepository.getNonExistingInterestIds.mockResolvedValue(
      [],
    );
    professionalProfileRepository.finExperienceLevel.mockResolvedValue({});
    testerRepository.findByUserId.mockResolvedValue({});

    await expect(handler.handle(command)).rejects.toThrow(
      TesterAlreadyExistsError.withUserId(command.userId),
    );
  });

  it('should create a tester and save it when all validations pass', async () => {
    testerRepository.findByEmail.mockResolvedValue(null);
    locationRepository.findLanguageById.mockResolvedValue(true);
    locationRepository.findCountryById.mockResolvedValue(true);
    professionalProfileRepository.getNonExistingInterestIds.mockResolvedValue(
      [],
    );
    professionalProfileRepository.finExperienceLevel.mockResolvedValue({});
    testerRepository.findByUserId.mockResolvedValue(null);

    await handler.handle(command);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(testerRepository.save).toHaveBeenCalled();
    const savedTester = testerRepository.save.mock.calls[0][0];
    expect(savedTester.id.value).toBe(validUuid);
  });
});
