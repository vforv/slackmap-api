import {Component, Inject} from '@slackmap/common';
import {resolve, join} from 'path';

@Component()
export class StorageConfigOptions {
  base_dir: string; // main storage dir path ../storage
  tmp_dir: string; // tmp dir: ../storage/tmp
  test_dir: string; // test dir: ./test
  base_url: string; // /assets/uploads => storage/public/uploads
}

@Component()
export class StorageConfig implements StorageConfigOptions {
  base_dir = resolve(__dirname, '../../storage'); // main storage dir
  tmp_dir = 'tmp'; // relative to storage dir
  test_dir = 'test'; // test dir
  base_url = '/assets/uploads'; // test dir

  constructor(@Inject(StorageConfigOptions) data: Partial<StorageConfigOptions> = {}) {
    Object.assign(this, data);
  }
  testDir(...files: string[]) {
    return join(this.base_dir, this.test_dir, ...files);
  }
  tmpDir(...files: string[]) {
    return join(this.base_dir, this.test_dir, ...files);
  }
  getMockDbFile() {
    return join(this.base_dir, 'db.json');
  }
}
