import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {ApiModule} from '@slackmap/api';
import {DataMockModule} from '@slackmap/data-mock';
import {DomainModule} from '@slackmap/domain';
import {ConfigModule} from '@slackmap/config';
@Module({
  imports: [ConfigModule, ApiModule, DomainModule.forRoot(DataMockModule)]
})
export class AppModuleMock {}
