import {ApiModelProperty} from '@nestjs/swagger';

export class FacebookProfileModel {
  @ApiModelProperty() id?: string;
  @ApiModelProperty() email?: string;
  @ApiModelProperty() name?: string;
  @ApiModelProperty() first_name?: string;
  @ApiModelProperty() last_name?: string;
}
