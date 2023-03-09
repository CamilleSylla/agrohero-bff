import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputs } from './dto/login.input';
import { LoginOutput } from './dto/login.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginOutput)
  async login(
    @Args({ name: 'credentials', type: () => LoginInputs }) dto: LoginInputs,
  ) {
    return await this.authService.login(dto);
  }
}
