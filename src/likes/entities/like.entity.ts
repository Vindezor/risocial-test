import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, post => post.likes, {
    onDelete: 'CASCADE',
    nullable: true
  })
  post?: Post | null; // Permitir null explícitamente

  @ManyToOne(() => Comment, comment => comment.likes, {
    onDelete: 'CASCADE',
    nullable: true
  })
  comment?: Comment | null; // Permitir null explícitamente
}