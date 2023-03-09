import { InputType, PickType } from '@nestjs/graphql';
import { UserOutput } from './user.output';

@InputType()
export class CreateUserInput extends PickType(
  UserOutput,
  ['email', 'password'],
  InputType,
) {}
