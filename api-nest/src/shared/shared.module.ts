import { Global, Module, type Provider } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';

import { ApiConfigService } from './services/api-config.service';

const providers: Provider[] = [ApiConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
