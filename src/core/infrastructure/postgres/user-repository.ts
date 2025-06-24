/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from 'src/core/domain/email';
import { UserPersistenceEntity } from './entities/user.persistence.entity';
import { UserRepository } from 'src/core/domain/user/user.repository';
import { UserEntity } from 'src/core/domain/user/user.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserPersistenceEntity)
    private readonly userRepository: Repository<UserPersistenceEntity>,
  ) {}

  async findByEmail(email: Email): Promise<UserEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { id: email.value },
    });

    if (!dbUser) {
      return undefined;
    }

    const dbCustomer = await this.userRepository.findOne({
      where: { id: dbUser.id },
    });

    if (!dbCustomer) {
      return undefined;
    }

    return this.toUserDomain(dbUser);
  }

  async findByUserId(userid: string): Promise<UserEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { userId: userid },
    });

    if (!dbUser) {
      return undefined;
    }

    const dbCustomer = await this.userRepository.findOne({
      where: { id: dbUser.id },
    });

    if (!dbCustomer) {
      return undefined;
    }

    return this.toUserDomain(dbUser);
  }

  private toUserDomain(dbUser: UserPersistenceEntity): UserEntity {
    return UserEntity.create(
      dbUser.id,
      dbUser.name,
      dbUser.surname,
      dbUser.email,
      dbUser.userId,
      dbUser.password,
    );
  }
}
