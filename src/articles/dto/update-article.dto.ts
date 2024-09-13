import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

// PartialType nghĩa là làm cho các trường trong class thành optional
// Có optional cả swagger
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
