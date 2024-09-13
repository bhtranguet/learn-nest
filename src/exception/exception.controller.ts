import {
  BadGatewayException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ForbiddenException } from './custom-exception/forbidden.exception';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';

@Controller('exception')
export class ExceptionController {
  @Get()
  async standard() {
    // Tham số đầu là body, tham số thứ 2 là httpCode, tham số thứ 3 là addtionalInfo về error
    // HttpException là standard exception of nestjs
    // Khi exception không xử lý được trong code nó sẽ được bắt ở filter exception, fitler exception sẽ tự động gửi response thân thiện đến người dùng.
    // Nest có Global exception filter, cái này sẽ bắt các HttpException và subclass của nó.
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async standardFull() {
    try {
      throw new Error();
    } catch (error) {
      throw new HttpException(
        // Tham số thứ nhất là body của response
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is custom message',
        },
        HttpStatus.FORBIDDEN,
        // Tham số thứ 3 không được gửi vào response, hữu dùng trong logging
        { cause: error },
      );
    }
  }

  @Get('builtIn')
  async builtIn() {
    // Built-in HTTP exceptions
    throw new BadGatewayException('Something bad happened!', {
      cause: new Error(),
      description: 'Some error description',
    });
  }

  async custom() {
    throw new ForbiddenException();
  }

  @Get('custom-exception-filter')
  // Sử dụng decorator để xác định dùng exception filter nào
  // Áp dụng exception filter cho method scope, ngoài ra có thể áp dụng cho controller scope, global scope
  @UseFilters(HttpExceptionFilter)
  async customExceptionFilter() {
    throw new BadGatewayException();
  }
}
