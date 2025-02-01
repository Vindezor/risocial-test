import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  sourceId: number;
}