import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';

@Module({
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
