import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatsModel } from './entities/cats.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatArgs } from './dto/createCat.dto';

@Resolver(CatsModel)
export class CatsMutationsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => CatsModel)
  async createCat(@Args('params') params: CreateCatArgs): Promise<CatsModel> {
    try {
      return await this.catsService.create(params);
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
