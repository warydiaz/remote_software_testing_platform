import { Name } from './name';
import { Surname } from './surname';
import { CustomerId } from './id';
import { Email } from './email';

export class CustomerEntity {
  private constructor(
    readonly id: CustomerId,
    readonly name: Name,
    readonly surname: Surname,
    readonly email: Email,
  ) {}

  static create(
    anId: string,
    aName: string,
    aSurname: string,
    anEmail: string,
  ): CustomerEntity {
    const id = CustomerId.create(anId);
    const name = Name.create(aName);
    const surname = Surname.create(aSurname);
    const email = Email.create(anEmail);

    return new CustomerEntity(id, name, surname, email);
  }
}
