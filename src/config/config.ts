import { merge } from 'lodash';
import { injectable, inject } from 'inversify';
import './slackmap';
import * as path from 'path';

export enum EnvConfig {
    PROD = 'prod',
    DEV = 'dev',
    TEST = 'test',
    TESTRUN = 'testrun'
}
export interface FacebookConfig {
    app_id: string;
    secret: string;
    scope: Array<string>;
}
export interface StorageConfig {
    base_dir: string;         // main storage dir path ../storage
    tmp_dir: string;          // tmp dir: ../storage/tmp
    test_dir: string;         // test dir: ./test
    base_url: string;         // /assets/uploads => storage/public/uploads
}
export interface PhotosConfig {
    base_url: string;             // /assets/uploads/p0
    private_storage_dir: string;  // private/media/p0    relative to storage_dir
    public_storage_dir: string;   // public/uploads/p0   relative to storage_dir
    sizes: PhotoSizes;
}
export interface PhotoSizes {
    xs_s: {
        width: number,      // 50
        height: number,     // 50
    };
    s_s: {
        width: number,      // 200
        height: number,     // 200
    };
    l: {
        width: number,      // 1300
        height: number,     // 960
    };
}
export interface SessionConfig {
    key: string;                 // session cookie name default koa.sid
    cookies: {                   // used by koa-session as cookie configuration object
        signed: true,            // should the koa sign the cookie with the key
        maxage: number           // 100 days
    };
}
export interface AppConfig {
    env: EnvConfig;
    domain: string;             // on what domain this app works: https://slackmap.com
    session: SessionConfig;
    facebook: FacebookConfig;
    storage: StorageConfig;
    photos: PhotosConfig;
}
export const NODE_ENV = Symbol('NODE_ENV');
export const STORAGE_BASE_DIR = Symbol('STORAGE_BASE_DIR');
/**
 * SlackMap api server configuration
 */
@injectable()
export class Config implements AppConfig {
    env: EnvConfig;
    domain: string;             // on what domain this app works: https://slackmap.com
    session: SessionConfig;
    facebook: FacebookConfig;
    storage: StorageConfig;
    photos: PhotosConfig;

    constructor(@inject(NODE_ENV) NODE_ENV: any, @inject(STORAGE_BASE_DIR) STORAGE_BASE_DIR: string) {
        if (!NODE_ENV) {
            throw new Error('NODE_ENV has to be set');
        }
        NODE_ENV = ('' + NODE_ENV).toUpperCase();
        if (!EnvConfig[NODE_ENV]) {
            throw new Error(`env "${NODE_ENV}" is not known env`);
        }

        const defaultConfig = require('./env/default');
        let localConfig = {};
        try {
            localConfig = require('./env/local');
        } catch (err) {

        }

        let envConfig = {};
        try {
            envConfig = require('./env/' + NODE_ENV.toLowerCase());
        } catch (err) {
            throw new Error(`config file for "${NODE_ENV}" env does not exist`);
        }

        Object.assign(this, merge({}, defaultConfig, envConfig, localConfig));

        this.env = <EnvConfig>EnvConfig[NODE_ENV];
        // set storage base dir
        if (STORAGE_BASE_DIR) {
            this.storage.base_dir = STORAGE_BASE_DIR;
        }

        if (!this.domain) {
            throw new Error('configuration env missing');
        }
    }

    testDir(...files: string[]) {
        return path.join(this.storage.base_dir, this.storage.test_dir, ...files);
    }
    tmpDir(...files: string[]) {
        return path.join(this.storage.base_dir, this.storage.test_dir, ...files);
    }
    getMockDbFile() {
        return path.join(this.storage.base_dir, 'db.json');
    }

}
