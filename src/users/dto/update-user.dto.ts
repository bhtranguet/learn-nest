import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Dùng Function PartialType để tạo ra các loại type khác nhau từ base type.
// Ví dụ này tạo ra Update type ở đó các trường trở thành optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Có thể pick vài trường từ base type
export class UpdateUserEmailDto extends PickType(CreateUserDto, [
  'email',
] as const) {}

// Có thể tạo ra type mới không bao gồm email property
export class UpdateUserNoEmailDto extends OmitType(CreateUserDto, [
  'email',
] as const) {}

export class CreateCatDto {
  name: string;
  breed: string;
}

export class AdditionalCatInfo {
  color: string;
}

// Gôm từ 2 kiểu
export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}
