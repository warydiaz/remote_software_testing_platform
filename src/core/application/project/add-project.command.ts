export class AddProjectCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly email: string,
    readonly product: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly testType: number[],
  ) {}
}
