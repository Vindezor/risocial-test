import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, content: string, image_url?: string): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const post = this.postRepository.create({ content, image_url, user });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }
    return post;
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}