import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Message } from './message.model'

@ObjectType()
export class Topic {
  @Field((type) => Int)
  id: number

  @Field((type) => Int)
  topic: number

  @Field((type) => Message)
  message: Message
  @Field((type) => Int)
  relevance: number
  @Field((type) => Int)
  confidence: number
}
