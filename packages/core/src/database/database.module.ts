import { ApiConfigModule, ApiConfigService } from '@kauction/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from '../core/entities';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => {
        return {
          ...config.mysqlConfig,
          entities: Object.values(entities),
        } as TypeOrmModuleOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
