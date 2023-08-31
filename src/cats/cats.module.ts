import { Module } from '@nestjs/common';
import { CatsQueriesResolver } from './cats.queries.resolver';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { CatsModel } from './entities/cats.model';
import { CatsService } from './cats.service';
import { CatsMutationsResolver } from './cats.mutations.resolver';

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
