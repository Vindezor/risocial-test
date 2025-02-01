import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @OneToMany(() => Like, like => like.comment)
  likes: Like[];
}