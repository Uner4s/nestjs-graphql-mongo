import { Field, HideField, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Metadata {
  @Field()
  count?: number
}

@ObjectType()
export class MongoProps {
  @HideField()
  save?: () => Promise<void>

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
