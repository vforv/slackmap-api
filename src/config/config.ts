import { merge } from 'lodash';
import { injectable } from 'inversify';
import './slackmap';
import * as path from 'path';

/**
 * SlackMap api server configuration
 */
@injectable()
export class Config {
    env: string;
    domain: string;             // on what domain this app works: https://slackmap.com
    port: number;               // on what por the app should lestend
    api_version: string;
    server_version: string;
    ui_version: string;
    keys: Array<string>;        // used by koa-session for signing the cookies
    facebook: {                 // configuration of your app used for auth
        app_id: string
        secret: string
        scope: Array<string>
    };
    session: {
        key: string                  // session cookie name default koa.sid
        cookies: {                   // used by koa-session as cookie configuration object
            signed: true,            // should the koa sign the cookie with the key
            maxage: number           // 100 days
        }
    };
    storage_dir: string;             // main storage dir: ../storage
    tmp_dir: string;                 // tmp dir: ../storage/tmp
    test_dir: string;                // test dir: ./test
    media: {
        base_path: string,          // /assets/uploads
        photos_base_path: string    // /assets/uploads/p0
        photos_storage_dir: string  // private/media/p0    relative to storage_dir
        photos_base_dir: string     // public/uploads/p0   relative to storage_dir
        sizes: {
            xs_s: {
                width: number,      // 50
                height: number,     // 50
            },
            s_s: {
                width: number,      // 200
                height: number,     // 200
            },
            l: {
                width: number,      // 1300
                height: number,     // 960
            }
        }
    };
    constructor() {
        const config = require('./env/default');

        let local = {};
        try {
            local = require('./env/local');
        } catch (err) {

        }
        let env = {};
        try {
            if (process.env.NODE_ENV) {
                // throw new Error('process.env.NODE_ENV has to be set');
                env = require('./env/' + process.env.NODE_ENV);
            }
        } catch (err) {
            throw new Error(`config file for "${process.env.NODE_ENV}" env does not exist`);
        }

        Object.assign(this, merge({}, config, env, local));
        this.env = process.env.NODE_ENV;
        if (!this.domain) {
            throw new Error('configuration env missing');
        }
    }
    testDir(...files: string[]) {
        return path.join(this.test_dir, ...arguments);
    }
    tmpDir(...files: string[]) {
        return path.join(this.storage_dir, this.tmp_dir, ...arguments);
    }
}
