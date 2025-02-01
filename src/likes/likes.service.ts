import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const user = await this.userRepository.findOneBy({ id: createLikeDto.userId });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // Usar undefined en lugar de null para relaciones no presentes
    const relations: Partial<Like> = {
        user,
        post: createLikeDto.postId 
            ? await this.postRepository.findOneBy({ id: createLikeDto.postId })
            : undefined,
        comment: createLikeDto.commentId 
            ? await this.commentRepository.findOneBy({ id: createLikeDto.commentId })
            : undefined
    };

    if (createLikeDto.postId && !relations.post) {
        throw new NotFoundException('Post no encontrado');
    }

    if (createLikeDto.commentId && !relations.comment) {
        throw new NotFoundException('Comentario no encontrado');
    }

    return this.likeRepository.save(relations);
}

  async delete(id: number): Promise<void> {
    await this.likeRepository.delete(id);
  }
}