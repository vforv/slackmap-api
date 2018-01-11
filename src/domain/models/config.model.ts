import {ApiModelProperty} from '@nestjs/swagger';

/**
 * UI config
 *
 */
export class ConfigModel {
  /**
   * domain this app is running
   */
  @ApiModelProperty({
    type: 'string',
    description: 'Domain on witch this app instance is running, exmpl: https://slackmap.com'
  })
  domain: string;

  /**
   * facebook SlackMap id
   */
  @ApiModelProperty({
    type: 'string',
    description: 'SlackMap Facebook App ID'
  })
  facebook_app_id?: string;

  /**
   * @uniqueItems
   */
  @ApiModelProperty({
    isArray: true,
    type: 'string',
    description: 'Minimum scopes required for user to connect with facebook'
  })
  facebook_scope?: string[];
}
