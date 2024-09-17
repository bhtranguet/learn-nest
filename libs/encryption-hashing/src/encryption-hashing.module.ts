import { Module } from '@nestjs/common';
import { EncryptionHashingService } from './encryption-hashing.service';

@Module({
  providers: [EncryptionHashingService],
  exports: [EncryptionHashingService],
})
export class EncryptionHashingModule {}
