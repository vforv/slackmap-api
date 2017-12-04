import {resolve} from 'path';

/**
 * development config
 */
module.exports = {
  domain: 'http://localhost:3000',
  storage: {
    base_dir: resolve('src/storage')
  }
};
