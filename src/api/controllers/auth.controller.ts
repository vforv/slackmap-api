import {Get, Post, Body, Controller} from '@nestjs/common';
import {ModuleRef} from '@nestjs/core';
import {ApiResponse, ApiBearerAuth, ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {
  AuthConnectFacebookResponseDto,
  AuthConnectFacebookRequestDto,
  AuthConnectFacebookUseCase,
  FacebookProfileModel
} from '@slackmap/domain';

@ApiUseTags('slackmap')
@Controller('auth')
export class AuthController {
  constructor(private connectFacebookUseCase: AuthConnectFacebookUseCase) {}

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Post('connectFacebook')
  @ApiResponse({status: 200, type: AuthConnectFacebookResponseDto, description: 'Login to SlackMap with Facebook'})
  public connectFacebook(@Body() data: AuthConnectFacebookRequestDto): Promise<AuthConnectFacebookResponseDto> {
    return this.connectFacebookUseCase.process(data);
  }
}
