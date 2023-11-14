import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '../../message./modules/message/message.controller';
import { MessageService } from '../../message./modules/message/message.service';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
