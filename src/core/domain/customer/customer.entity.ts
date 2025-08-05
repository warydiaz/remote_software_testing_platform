import { Name } from '../name';
import { Surname } from '../surname';
import { CustomerId } from './id';
import { Email } from '../email';
import { CompanyName } from './companyName';
import { TaxDomicile } from './taxDomicile';
import { NIF } from './nif';

export class CustomerEntity {
  private constructor(
    readonly id: CustomerId,
    readonly name: Name,
    readonly surname: Surname,
    readonly email: Email,
    readonly companyName: CompanyName,
    readonly taxDomicile: TaxDomicile,
    readonly NIF: NIF,
    readonly userId: string,
    readonly password: string,
  ) {}

  static create(
    anId: string,
    aName: string,
    aSurname: string,
    anEmail: string,
    aCompanyName: string,
    aTaxDomicile: string,
    aNIF: string,
    aUserId: string,
    aPassword: string,
  ): CustomerEntity {
    const id = CustomerId.create(anId);
    const name = Name.create(aName);
    const surname = Surname.create(aSurname);
    const email = Email.create(anEmail);
    const companyName = CompanyName.create(aCompanyName);
    const taxDomicile = TaxDomicile.create(aTaxDomicile);
    const nif = NIF.create(aNIF);

    return new CustomerEntity(
      id,
      name,
      surname,
      email,
      companyName,
      taxDomicile,
      nif,
      aUserId,
      aPassword,
    );
  }
}
