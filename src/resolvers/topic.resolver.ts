import { Args, Int, ResolveField, Parent, Resolver, Query } from '@nestjs/graphql'

import { Topic } from '../models/topic.model'

import { PrismaService } from '../prisma/prisma.service'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [Topic])
  async topics() {
    return this.prisma.topic.findMany()
  }
}
