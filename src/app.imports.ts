import { join } from 'path'

import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

export const AppImports = (env: NodeJS.ProcessEnv): DynamicModule[] => {
  return [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${env.NODE_ENV ? `.${env.NODE_ENV}` : ''}.env`,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      sortSchema: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: env.MONGO_URL,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ]
}
