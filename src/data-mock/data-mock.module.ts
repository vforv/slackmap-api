import {Module, Global} from '@nestjs/common';
import {UserGateway, FacebookGateway, EmailGateway} from '@slackmap/data';
import {UserGatewayMock} from './gateways/user.gateway.mock';
import {FacebookGatewayMock} from './gateways/facebook.gateway.mock';
import {EmailGatewayMock} from './gateways/email.gateway.mock';
import {DbMock, dbMockFactory} from './db/db.mock';

const providers = [
  {provide: DbMock, useFactory: dbMockFactory},
  {provide: UserGateway, useClass: UserGatewayMock},
  {provide: FacebookGateway, useClass: FacebookGatewayMock},
  {provide: EmailGateway, useClass: EmailGatewayMock}
];

@Global()
@Module({
  components: providers,
  exports: providers.map(p => p.provide)
})
export class DataMockModule {}
