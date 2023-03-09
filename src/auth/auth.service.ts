import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInputs } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginInputs) {
    const { email, password } = dto;
    const targetUser = await this.userService.getUserByEmail(email);
    const match = await bcrypt.compare(password, targetUser.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    console.log(match);
  }
}
