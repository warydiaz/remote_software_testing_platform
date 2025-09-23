export class CreateFolderCommand {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly repository_id: string,
    readonly path: string,
    readonly tester_id: string,
    readonly description: string,
  ) {}
}
