import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInputs {
  @Field((type) => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field((type) => String)
  @IsNotEmpty()
  password: string;
}
