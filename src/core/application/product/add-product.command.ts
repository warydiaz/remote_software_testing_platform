export class AddProductCommand {
  constructor(
    readonly id: string,
    readonly projectId: string,
    readonly name: string,
    readonly description: string,
    readonly cycleStartDate: Date,
    readonly cycleEndDate: Date,
    readonly environment: string,
  ) {}
}
