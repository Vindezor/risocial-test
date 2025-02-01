import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Follower } from 'src/followers/entities/follower.entity';
import { Message } from 'src/messages/entities/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  profile_picture_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Follower, follower => follower.follower)
  followers: Follower[];

  @OneToMany(() => Follower, follower => follower.followed)
  following: Follower[];

  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}