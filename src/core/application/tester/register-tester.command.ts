export class RegisterTesterCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly birth_date: Date,
    readonly language: number,
    readonly city: string,
    readonly postal_code: string,
    readonly country: number,
    readonly experience_level: number,
    readonly interests: number[],
  ) {}
}
