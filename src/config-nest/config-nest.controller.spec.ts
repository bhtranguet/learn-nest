import { Test, TestingModule } from '@nestjs/testing';
import { ConfigNestController } from './config-nest.controller';

describe('ConfigNestController', () => {
  let controller: ConfigNestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigNestController],
    }).compile();

    controller = module.get<ConfigNestController>(ConfigNestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
