import * as http from 'http';

declare global {
  namespace ChaiHttp {
    export interface Agent {
      app: http.Server;
    }
    export interface Assertion {
      like: (val: any) => any;
    }
  }
  namespace Chai {
    export interface Assertion {
      like: (val: any) => any;
    }
  }
}

export {}; // this file needs to be a module
