import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // Tham khỏa class-validator npm package
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
