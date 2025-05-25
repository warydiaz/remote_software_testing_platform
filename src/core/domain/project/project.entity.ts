import { ProjectId } from './id';
import { ProjectName } from './projectName';
import { ProjectDescription } from './projectDescription';
import { Email } from '../email';
import { ProductProject } from './productProject';
import { ProjectDate } from './projectDate';
import { TestType } from './testType';

export class ProjectEntity {
  private constructor(
    readonly id: ProjectId,
    readonly name: ProjectName,
    readonly description: ProjectDescription,
    readonly email: Email,
    readonly product: ProductProject,
    readonly startDate: ProjectDate,
    readonly endDate: ProjectDate,
    readonly testTypes: TestType[],
  ) {}

  static create(
    anId: string,
    aName: string,
    aDescription: string,
    anEmail: string,
    aProduct: string,
    aStartDate: Date,
    anEndDate: Date,
    testTypeNumbers: number[],
  ): ProjectEntity {
    const id = ProjectId.create(anId);
    const name = ProjectName.create(aName);
    const description = ProjectDescription.create(aDescription);
    const email = Email.create(anEmail);
    const product = ProductProject.create(aProduct);
    const startDate = ProjectDate.create(aStartDate);
    const endDate = ProjectDate.create(anEndDate);
    const testTypes = testTypeNumbers.map((n) => TestType.create(n));

    return new ProjectEntity(
      id,
      name,
      description,
      email,
      product,
      startDate,
      endDate,
      testTypes,
    );
  }
}
