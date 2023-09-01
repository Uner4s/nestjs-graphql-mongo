import { Field, ID, ObjectType, Int } from '@nestjs/graphql'
import { Index, prop } from '@typegoose/typegoose'

import { MongoProps } from '../../helpers/entities/mongo.model'

@ObjectType()
@Index({ email: 1 }, { unique: true })
export class CatsModel extends MongoProps {
  @Field(() => ID)
  _id!: string

  @Field(() => String)
  @prop({ unique: true })
  ownerEmail: string

  @Field(() => String)
  @prop({ default: 'Unknown' })
  name: string

  @Field(() => Int)
  @prop()
  age: number
}
