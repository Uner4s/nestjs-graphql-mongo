import { Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatsModel } from './entities/cats.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(CatsModel)
export class CatsQueriesResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  helloCatWorld(): string {
    return 'Hello Cat World!';
  }

  @Query(() => [CatsModel])
  async getCatsInBD(): Promise<CatsModel[]> {
    try {
      return await this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
