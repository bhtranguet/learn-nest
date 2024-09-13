import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    // super sử dụng để gọi contructor của class cha, đảm bảo class cha được khởi tạo trước khi class con thêm logic
    super(
      {
        httpCode: HttpStatus.FORBIDDEN,
        error: 'Custom HttpException',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
