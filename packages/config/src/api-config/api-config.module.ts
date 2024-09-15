import { Module, Provider } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { ConfigService } from '@nestjs/config';
const providers: Provider[] = [ApiConfigService, ConfigService];
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class ApiConfigModule {}
