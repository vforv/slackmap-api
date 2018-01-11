import {Module} from '@nestjs/common';
import * as controllers from './controllers';
import {ApiExceptionFilter} from './exception-filter';

@Module({
  imports: [],
  controllers: Object.values(controllers),
  components: [ApiExceptionFilter],
  exports: []
})
export class ApiModule {}
