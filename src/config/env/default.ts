/**
 * all configuration of slackmap
 */
module.exports = {
  env: 'dev',
  debug: false,
  domain: 'https://slackmap.com',
  port: process.env.PORT,
  api_version: '0.0.0',
  server_version: '0.0.0',
  ui_version: '0.0.0',
  keys: ['local-secret-key'], // used by koa-session for signing the cookies
  facebook: {
    app_id: '', // slackmap.loc
    secret: '', // slackmap.loc
    scope: ['email']
  },
  // used by koa-session as cookie configuration object
  session: {
    key: 'koa.sid', // session cookie name
    cookies: {
      signed: true,
      maxage: 1000 * 60 * 60 * 24 * 100 // 100 days
    }
  },
  storage_dir: '../../storage', // main storage dir
  tmp_dir: 'tmp', // relative to storage dir
  test_dir: './test', // test dir
  media: {
    base_path: '/assets/uploads',
    photos_base_path: '/assets/uploads/p0',
    photos_storage_dir: 'private/media/p0', // relative to storage dir
    photos_base_dir: 'public/uploads/p0', // relative to storage dir
    sizes: {
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
    }
  }
};
