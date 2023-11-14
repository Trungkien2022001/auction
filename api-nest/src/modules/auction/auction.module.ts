import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
