// import { Express } from "express";

import * as http from 'http';

// import * as Koa from 'koa';
// // import Logger = require('bunyan');

// declare module 'koa' {
//     interface BaseContext {
//         render: any;
//         // log: Logger;
//         getUser: () => any;
//     }
// }
export {}; // this file needs to be a module
declare global {
    namespace ChaiHttp {
        export interface Agent {
            app: http.Server;
        }
    }
}

