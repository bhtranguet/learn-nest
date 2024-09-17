import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseArrayPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  // Khi enable transform '1' sẽ convert thành 1, bởi vì id: để kiểu dữ liệu number
  findOne(@Param('id') id: number) {
    console.log(`Type of id is ${typeof id}`);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    // transform data đến từ request tường minh bằng ParseIntPipe or ParseBoolPipe
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(`Type of id is ${typeof id}`);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post()
  createBulk(
    // Thêm new ParseArrayPipe({ items: CreateUserDto }) để giúp validate array
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDtos: CreateUserDto[],
  ) {
    return 'This action adds new users';
  }

  @Get()
  findByIds(
    // new ParseArrayPipe({ items: Number, separator: ',' }) để parse string to array
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return 'This action returns users by ids';
  }
}
