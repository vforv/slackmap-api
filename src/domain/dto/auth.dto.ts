import {ApiModelProperty} from '@nestjs/swagger';
import {FacebookProfileModel, UserModel} from '../models';

export class AuthConnectFacebookRequestDto {
  @ApiModelProperty() accessToken: string;
  @ApiModelProperty() signedRequest?: string;
}

export class AuthConnectFacebookResponseDto {
  @ApiModelProperty() facebookProfile: FacebookProfileModel;
  @ApiModelProperty({isArray: true, type: UserModel})
  users: UserModel[];
}
