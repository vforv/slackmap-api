import {EmailGateway} from '@slackmap/data';
import {Component} from '@nestjs/common';
import {EmailEntity} from '@slackmap/data';

@Component()
export class EmailGatewayMock implements EmailGateway {
  constructor() {}
  send(email: EmailEntity) {}
}
