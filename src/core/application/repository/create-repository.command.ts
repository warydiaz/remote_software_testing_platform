export class CreateRepositoryCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly tester_id: string,
    readonly description: string,
  ) {}
}
