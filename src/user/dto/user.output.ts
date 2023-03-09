import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}
