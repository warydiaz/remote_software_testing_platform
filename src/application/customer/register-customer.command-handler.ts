import { RegisterCustomerCommand } from './register-customer.command'
import { Inject, Injectable } from '@nestjs/common'
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/user/user.repository'
import { UserEntity } from '../../domain/user/user.entity'
import { UserAlreadyExistsError } from './user-already-exists.error'
import { Username } from '../../domain/user/username'

@Injectable()
export class RegisterUserCommandHandler {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository: UserRepository,
  ) {}

  handle(command: RegisterUserCommand) {
    const username = Username.create(command.username)

    if (this.repository.findByUsername(username)) {
      throw UserAlreadyExistsError.withUsername(command.username)
    }

    const user = UserEntity.create(command.id, username.value, command.fullname)

    this.repository.save(user)
  }
}
