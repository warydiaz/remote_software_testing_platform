export class RegisterCustomerCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly companyName: string,
    readonly taxDomicile: string,
    readonly NIF: string,
    readonly userId: string,
    readonly password: string,
  ) {}
}
