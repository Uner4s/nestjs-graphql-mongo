import { Test, TestingModule } from '@nestjs/testing'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'

import { AppImports } from '../../src/app.imports'
import { CatsModule } from '../../src/cats/cats.module'
import { CatsMutationsResolver } from '../../src/cats/resolvers/cats.mutations.resolver'
import { CatsQueriesResolver } from '../../src/cats/resolvers/cats.queries.resolver'

import { getCatParams } from './factory'

describe('CatsResolver', () => {
  let catsQueriesResolver: CatsQueriesResolver
  let catsMutatuionsResolver: CatsMutationsResolver
  let mongoServer: MongoMemoryServer

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    const env = {
      MONGO_URL: mongoUri,
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [...AppImports(env), CatsModule],
    }).compile()

    catsQueriesResolver = module.get<CatsQueriesResolver>(CatsQueriesResolver)
    catsMutatuionsResolver = module.get<CatsMutationsResolver>(
      CatsMutationsResolver,
    )
  })

  // Close all BD Connections
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('Should resolvers be defined', async () => {
    expect(catsQueriesResolver).toBeDefined()
    expect(catsMutatuionsResolver).toBeDefined()
  })

  describe('create cat', () => {
    it('should create a cat register', async () => {
      const catParams = getCatParams()

      const result = await catsMutatuionsResolver.createCat(catParams)

      expect(result).toBeDefined()
      expect(result._id).toBeDefined()
      expect(result.name).toBe(catParams.name)
      expect(result.age).toBe(catParams.age)
      expect(result.ownerEmail).toBe(catParams.ownerEmail)
    })
  })

  describe('get cats list', () => {
    it('should return a array of cats', async () => {
      const result = await catsQueriesResolver.getCatsInBD()

      expect(result).toBeInstanceOf(Array)
    })
  })
})
