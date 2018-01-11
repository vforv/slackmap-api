import {Module, Global} from '@nestjs/common';
import {NODE_ENV, STORAGE_BASE_DIR, Config} from '@slackmap/config';

export function configComponentsProviderFactory() {
  return [
    {provide: NODE_ENV, useValue: process.env.NODE_ENV},
    {provide: STORAGE_BASE_DIR, useValue: process.env.STORAGE_BASE_DIR || '../storage'},
    Config
  ];
}

@Global()
@Module({
  components: configComponentsProviderFactory(),
  exports: [Config]
})
export class ConfigModule {}
