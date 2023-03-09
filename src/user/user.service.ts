import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserInput) {
    const { password } = dto;
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ ...dto, password: hash });
    return this.userRepository.save(user);
  }

  async me(id: number) {
    const user = await this.userRepository.findBy({ id });
    return user[0];
  }

  async getUserByEmail(email: string) {
    const [user] = await this.userRepository.findBy({ email });
    return user;
  }
}
