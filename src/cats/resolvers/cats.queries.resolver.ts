import { HttpException, HttpStatus } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import { CatsModel } from '../entities/cats.model'
import { CatsService } from '../services/cats.service'

@Resolver(CatsModel)
export class CatsQueriesResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  helloCatWorld(): string {
    return 'Hello Cat World!'
  }

  @Query(() => [CatsModel])
  async getCatsInBD(): Promise<CatsModel[]> {
    try {
      return await this.catsService.findAll()
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }
}
