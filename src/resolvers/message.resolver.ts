import { Parent, Query, ResolveField, Resolver, ArgsType, Field, Int, Args } from '@nestjs/graphql'
import { Message } from '../models/message.model'
import { PrismaService } from '../prisma/prisma.service'
import { Topic } from 'src/models/topic.model';
import { MessageWhereInput } from '@prisma/client';

const DEFAULT_MIN_CONFIDENCE=224
const DEFAULT_MIN_RELEVANCE=32

@ArgsType()
class MessageArgs  {
  


  @Field((type) => [Int])
  topics:number[] = []
  @Field((type) => [Int])
  confidence:number = DEFAULT_MIN_CONFIDENCE
  @Field((type) => [Int])
  relevance:number = DEFAULT_MIN_RELEVANCE
  @Field((type) => Int)
  offset = 0;
  @Field((type) => Int)
  limit = 10;
}
@Resolver(() => Message)
export class MessageResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [Message])
  async messages(@Args() {offset,limit,topics,confidence,relevance}:MessageArgs) {
    const where:MessageWhereInput | undefined = topics.length ? {
      AND:topics.map(topic=>{
        return {
          Topic:{
            some:{
            topic,
            confidence:{gte:confidence},
            relevance:{gte:relevance}
        }}}
      })
     }:undefined
    return this.prisma.message.findMany({skip:offset,take:limit,where})
  }

  @ResolveField()
  async topics(@Parent() message: Message) {
    return this.prisma.topic.findMany({
      where: { message: { id: message.id } },
    })
  }
}
