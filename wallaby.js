const path = require('path');
module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.ts',
      {
        pattern: 'src/**/*.spec.ts',
        ignore: true
      },
      {pattern: 'src/rest/routes-template.ts', ignore: true}
    ],

    tests: ['src/**/*.spec.ts'],

    env: {
      type: 'node',
      params: {
        env: `NODE_ENV=testrun;STORAGE_BASE_DIR=${path.resolve('./src/storage')}`
      }
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'mocha',
    compilers: {
      'src/**/*.ts': wallaby.compilers.typeScript({module: 'commonjs'})
    }
  };
};
