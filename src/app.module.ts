import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service';
import { TopicResolver } from './resolvers/topic.resolver';
import { MessageResolver } from './resolvers/message.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    debug:true,playground:true }),
  ],
  providers: [PrismaService,TopicResolver,MessageResolver],
})
export class AppModule {}
