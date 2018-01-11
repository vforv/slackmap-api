import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {ApiModule} from '@slackmap/api';
import {DataModule} from '@slackmap/data';
import {DomainModule} from '@slackmap/domain';
import {ConfigModule} from '@slackmap/config';
@Module({
  imports: [ConfigModule, ApiModule, DomainModule.forRoot(DataModule)]
})
export class AppModule {}
