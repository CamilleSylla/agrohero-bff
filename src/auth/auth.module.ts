import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
dotenv.config();
console.log(process.env.JWT_SECRET);

@Module({
  imports: [UserModule, JwtModule, ConfigModule],
  providers: [AuthService, AuthResolver, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
