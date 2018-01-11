const path = require('path');
module.exports = function(wallaby) {
  return {
    files: [
      'tsconfig.json',
      'src/**/*.ts',
      {
        pattern: 'src/**/*.spec.ts',
        ignore: true
      }
    ],
    tests: ['src/**/*.spec.ts'],
    env: {
      type: 'node',
      params: {
        env: `NODE_ENV=testrun;STORAGE_BASE_DIR=${path.resolve('./src/storage')}`
      }
    },
    setup: function(wallaby) {
      if (global._tsconfigPathsRegistered) return;
      const tsConfigPaths = require('tsconfig-paths');
      const tsconfig = require('./tsconfig.json');
      tsConfigPaths.register({
        baseUrl: tsconfig.compilerOptions.baseUrl,
        paths: tsconfig.compilerOptions.paths
      });
      global._tsconfigPathsRegistered = true;
    },
    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'mocha',
    compilers: {
      'src/**/*.ts': wallaby.compilers.typeScript({module: 'commonjs'})
    }
  };
};
