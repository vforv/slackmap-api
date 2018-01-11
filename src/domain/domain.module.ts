import * as usecases from './usecases';
import {Module, Global, DynamicModule} from '@nestjs/common';

const providers = Object.values(usecases);

@Global()
@Module({
  components: providers,
  exports: providers
})
export class DomainModule {
  static forRoot(DataModule: any): DynamicModule {
    return {
      module: DomainModule,
      imports: [DataModule]
    };
  }
}
