import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Article } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
      // select dùng để chọn trường trả về sau khi create
      select: {
        title: true,
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
      },
    });
  }

  findDrafts() {
    // findMany giống select where
    return this.prisma.article.findMany({
      where: {
        published: false,
      },
    });
  }

  async findOne(id: number) {
    // Yêu cầu trường trong where phải là unique hoặc là khóa chính
    let article: Article = await this.cacheManager.get<Article>(
      `article:${id}`,
    );

    if (!article) {
      console.log('get from database');
      article = await this.prisma.article.findUnique({
        where: {
          id,
        },
      });
    }

    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }

  async getAll() {
    // Learn from observable rxjs
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/articles'),
    );
    return response.data;
  }
}
