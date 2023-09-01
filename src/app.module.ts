import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AppExceptionFilter } from './app.exceptions'
import { AppImports } from './app.imports'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [...AppImports(process.env), CatsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
