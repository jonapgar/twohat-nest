import { Args, Int, ResolveField, Parent, Resolver, Query } from '@nestjs/graphql'

import { Message } from '../models/message.model'
import { PrismaService } from '../prisma/prisma.service'

@Resolver(() => Message)
export class MessageResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [Message])
  async messages() {
    return this.prisma.message.findMany()
  }

  @ResolveField()
  async topics(@Parent() message: Message) {
    return this.prisma.topic.findMany({
      where: { message: { id: message.id } },
    })
  }
}
