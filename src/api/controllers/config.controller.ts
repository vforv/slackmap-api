import {Get, Post, Body, Controller, Inject} from '@nestjs/common';
import {ApiResponse, ApiBearerAuth, ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {ModuleRef} from '@nestjs/core';
import {ConfigGetUseCase, ConfigGetResponseDto} from '@slackmap/domain';

// @ApiResponse({status: 403, description: 'Forbidden.'})
@ApiUseTags('slackmap')
@Controller('config')
export class ConfigController {
  constructor(private module: ModuleRef, private configGetUseCase: ConfigGetUseCase) {}
  @Get()
  @ApiResponse({status: 200, type: ConfigGetResponseDto, description: 'SlackMap UI configuration'})
  async configGet(): Promise<ConfigGetResponseDto> {
    // const configGetUseCase = this.module.get<ConfigGetUseCase>(ConfigGetUseCase);
    return this.configGetUseCase.process();
  }
}
