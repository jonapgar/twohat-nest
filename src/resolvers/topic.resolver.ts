import { Query, Resolver, ArgsType, Args, Int, Field } from '@nestjs/graphql'
import { Topic } from '../models/topic.model'
import { PrismaService } from '../prisma/prisma.service'
import { TopicWhereInput } from '@prisma/client'



@ArgsType()
class TopicArgs  {
  @Field((type) => [Int])
  topics:number[] = []
  @Field((type) => [Int])
  confidence = 0
  @Field((type) => [Int])
  relevance = 0
}
@Resolver(() => Topic)
export class TopicResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [Topic])
  async topics(@Args() {topics,confidence,relevance}:TopicArgs) {
    const where:TopicWhereInput ={
      topic:topics.length ? {in:topics}:undefined,
      relevance:{gte:relevance},
      confidence:{gte:confidence}
    }
    return this.prisma.topic.findMany({where})
  }
}
