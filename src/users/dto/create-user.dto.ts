import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // Tham khỏa class-validator npm package
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
