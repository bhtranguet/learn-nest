import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
      select: {
        username: true,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByUsername(username: string): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
