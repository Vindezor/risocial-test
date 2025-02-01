import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, like => like.post)
  likes: Like[];
}