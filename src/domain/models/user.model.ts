import {ApiModelProperty} from '@nestjs/swagger';
/**
 * User model definition
 */
export class UserModel {
  @ApiModelProperty() rid?: string;
  @ApiModelProperty() location?: string;
  @ApiModelProperty() facebook_id?: string;
  @ApiModelProperty() name?: string;
  @ApiModelProperty() first_name?: string;
  @ApiModelProperty() last_name?: string;
}
