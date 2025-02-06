import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower]),
    TypeOrmModule.forFeature([User])
  ],
  providers: [FollowersService],
  controllers: [FollowersController]
})
export class FollowersModule {}
