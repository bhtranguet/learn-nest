import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  // Thêm decorator này để làm cho trường visible tới swagger
  // Xem ở mục Schemas trong swagger
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty()
  body: string;
  @ApiProperty({ required: false, default: false })
  published: boolean = false;
}
