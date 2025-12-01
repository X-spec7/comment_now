import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/expert_platform'),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
    InvitationsModule,
  ],
})
export class V1Module {}

