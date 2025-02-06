import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
