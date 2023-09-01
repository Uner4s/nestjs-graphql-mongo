import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CreateCatArgs } from '../dto/createCat.dto'
import { CatsModel } from '../entities/cats.model'
import { CatsService } from '../services/cats.service'

@Resolver(CatsModel)
export class CatsMutationsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => CatsModel)
  async createCat(@Args('params') params: CreateCatArgs): Promise<CatsModel> {
    try {
      return await this.catsService.create(params)
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }
}
