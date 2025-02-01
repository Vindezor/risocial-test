import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOne({ where: { id: createCommentDto.userId } });
    const post = await this.postRepository.findOne({ where: { id: createCommentDto.postId } });

    if (!user || !post) {
      throw new NotFoundException('Usuario o publicación no encontrados');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['user', 'post'] });
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}