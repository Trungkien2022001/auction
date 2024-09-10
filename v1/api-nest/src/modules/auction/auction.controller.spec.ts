import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';

describe('AuctionController', () => {
  let controller: AuctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController],
      providers: [AuctionService],
    }).compile();

    controller = module.get<AuctionController>(AuctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
