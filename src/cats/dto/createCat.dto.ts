import { MinLength } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatArgs {
  @Field()
  name: string;

  @Field()
  ownerEmail: string;

  @Field(() => Int)
  @MinLength(1)
  age: number;
}
