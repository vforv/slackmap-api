import {Component, Inject} from '@slackmap/common';
import {StorageConfig} from 'config/configs';

export interface Sizes {
  xs_s: {
    width: number; // 50
    height: number; // 50
  };
  s_s: {
    width: number; // 200
    height: number; // 200
  };
  l: {
    width: number; // 1300
    height: number; // 960
  };
}

@Component()
export class PhotosConfigOptions {
  base_url: string; // /assets/uploads/p0
}

@Component()
export class PhotosConfig implements PhotosConfigOptions {
  base_url = '/assets/uploads/p0'; // /assets/uploads/p0
  private_storage_dir = 'private/media/p0'; // relative to storage base dir
  public_storage_dir = 'public/uploads/p0'; // relative to storage base dir
  sizes: Sizes = {
    xs_s: {
      width: 50,
      height: 50
    },
    s_s: {
      width: 200,
      height: 200
    },
    l: {
      width: 1300,
      height: 960
    }
  };
  constructor(@Inject(PhotosConfigOptions) data: Partial<PhotosConfigOptions> = {}, private storageConfig: StorageConfig) {
    Object.assign(this, data);
  }

  getUrl() {}
}
