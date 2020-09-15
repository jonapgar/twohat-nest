import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Topic } from './topic.model'



@ObjectType()
export class Message {
  @Field((type) => Int)
  id: number

  @Field()
  player: string

  @Field((type) => Int)
  client_id: number

  @Field()
  text: string

  @Field()
  simplified: string

  @Field((type) => Int)
  flags: number

  @Field((type) => [Topic])
  topics: Topic[]
}
