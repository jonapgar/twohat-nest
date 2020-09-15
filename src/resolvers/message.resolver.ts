import { Parent, Query, ResolveField, Resolver, ArgsType, Field, Int, Args } from '@nestjs/graphql'
import { Message } from '../models/message.model'
import { PrismaService } from '../prisma/prisma.service'


@ArgsType()
class MessageArgs  {
  


  @Field((type) => Int)
  topic?:number
  @Field((type) => Int)
  offset = 0;

  @Field((type) => Int)
  limit = 10;
}
@Resolver(() => Message)
export class MessageResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [Message])
  async messages(@Args() {offset,limit,topic}:MessageArgs) {
    const options = topic ? {where:{
      Topic:{some:{topic}}
     }}:undefined
    return this.prisma.message.findMany({skip:offset,take:limit,...options})
  }

  @ResolveField()
  async topics(@Parent() message: Message) {
    return this.prisma.topic.findMany({
      where: { message: { id: message.id } },
    })
  }
}
