import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FollowersModule } from './followers/followers.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',           // Tipo de base de datos
      host: 'localhost',          // Host de la base de datos
      port: 5432,                 // Puerto de PostgreSQL
      username: 'postgres',     // Usuario de la base de datos
      password: 'Caracas01.',  // Contraseña de la base de datos
      database: 'risocial-test',       // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entidades de TypeORM
      synchronize: true,          // Sincroniza esquemas (solo para desarrollo)
      logging: true,              // Habilita logs de SQL (opcional)
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FollowersModule,
    MessagesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
