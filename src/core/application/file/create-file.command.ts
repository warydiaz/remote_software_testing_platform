export class CreateFileCommand {
  constructor(
    readonly id: string,
    readonly folder_id: string,
    readonly tester_id: string,
    readonly test_id: string,
  ) {}
}
