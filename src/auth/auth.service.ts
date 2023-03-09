import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInputs } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginInputs) {
    const { email } = dto;
    const { password, ...user } = await this.userService.getUserByEmail(email);
    const match = await bcrypt.compare(dto.password, password);
    if (!match) {
      throw new UnauthorizedException();
    }
    return {
      token: this.jwtService.sign(user, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
