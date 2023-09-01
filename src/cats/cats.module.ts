import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'

import { CatsModel } from './entities/cats.model'
import { CatsMutationsResolver } from './resolvers/cats.mutations.resolver'
import { CatsQueriesResolver } from './resolvers/cats.queries.resolver'
import { CatsService } from './services/cats.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CatsModel,
        schemaOptions: {
          timestamps: true,
          versionKey: false,
          collection: 'cats',
        },
      },
    ]),
  ],
  providers: [CatsQueriesResolver, CatsMutationsResolver, CatsService],
})
export class CatsModule {}
