import { Field, InputType, Int } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class CreateCatArgs {
  @Field()
  name: string

  @Field()
  ownerEmail: string

  @Field(() => Int)
  @MinLength(1)
  age: number
}
