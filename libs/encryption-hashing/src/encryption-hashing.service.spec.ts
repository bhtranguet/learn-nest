import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionHashingService } from './encryption-hashing.service';

describe('EncryptionHashingService', () => {
  let service: EncryptionHashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionHashingService],
    }).compile();

    service = module.get<EncryptionHashingService>(EncryptionHashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#decryptText', () => {
    it('should decryptText text', async () => {
      const originText = 'myText';
      const encryptText = await service.encryptText(originText);
      const decryptText = await service.decryptText(encryptText);
      expect(decryptText).toBe(originText);
    });
  });
});
