import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './entities/follower.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateFollowerDto } from './dto/create-follower.dto';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async follow(createFollowerDto: CreateFollowerDto): Promise<Follower> {
    const follower = await this.userRepository.findOne({ where: { id: createFollowerDto.followerId } });
    const followed = await this.userRepository.findOne({ where: { id: createFollowerDto.followedId } });

    if (!follower || !followed) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const follow = this.followerRepository.create({
      follower,
      followed,
    });

    return this.followerRepository.save(follow);
  }

  async unfollow(id: number): Promise<void> {
    await this.followerRepository.delete(id);
  }
}