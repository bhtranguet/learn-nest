import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

// Decorator thêm metadata vào HttpExceptionFilter
// @Catch(HttpException) nói với nest rằng Exception filter này chỉ sử lý HttpException
// Nest có Global Exception Filter khi mà exception không được xử lý trong logic code thì nó sẽ được xử lý ở exception filter để trả về response thân thiện cho người dùng
// Đây là cách tạo Custom Exception Filter override Global Exception Filter
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // ArgumentHost là trừu tượng params truyển vào handler
  // Http application host là trừu tượng của [request, response, next]
  // GraphQL application host là [root, args, context, info]
  // const [req, res, next] = host.getArgs();
  catch(exception: HttpException, host: ArgumentsHost) {
    // Không nên dùng const [req, res, next] = host.getArgs() vì nó gắn ứng dụng với 1 context cụ thể
    // Nên dùng host.switchToHttp
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // sửa lại response
    response.status(status).json({
      httpCode: status,
      // ISO date format: YYYY-MM-DDTHH:mm:ss.sssZ
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
