import { Name } from '../name';
import { Surname } from '../surname';
import { TesterId } from './id';
import { Email } from '../email';
import { BirthDate } from './birthDate';

export class TesterEntity {
  private constructor(
    readonly id: TesterId,
    readonly name: Name,
    readonly surname: Surname,
    readonly email: Email,
    readonly birthDate: BirthDate,
    readonly language: number,
    readonly city: string,
    readonly postalCode: string,
    readonly country: number,
    readonly experienceLevel: number,
    readonly interests: number[],
    readonly userId: string,
    readonly password: string,
  ) {}

  static create(
    anId: string,
    aName: string,
    aSurname: string,
    anEmail: string,
    aBirthDate: Date,
    aLanguage: number,
    aCity: string,
    aPostalCode: string,
    aCountry: number,
    anExperienceLevel: number,
    anInterests: number[],
    aUserId: string,
    aPassword: string,
  ): TesterEntity {
    const id = TesterId.create(anId);
    const name = Name.create(aName);
    const surname = Surname.create(aSurname);
    const email = Email.create(anEmail);
    const birthDate = BirthDate.create(aBirthDate);

    return new TesterEntity(
      id,
      name,
      surname,
      email,
      birthDate,
      aLanguage,
      aCity,
      aPostalCode,
      aCountry,
      anExperienceLevel,
      anInterests,
      aUserId,
      aPassword,
    );
  }
}
