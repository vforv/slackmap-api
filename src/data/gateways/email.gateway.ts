import {Component} from '@slackmap/common';
import {EmailEntity} from '@slackmap/data';

@Component()
export class EmailGateway {
  send(email: EmailEntity) {}
}
