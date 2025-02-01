import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @Transform(({ value }) => value ? Number(value) : undefined)
  postId?: number;

  @IsOptional()
  @Transform(({ value }) => value ? Number(value) : undefined)
  commentId?: number;
}