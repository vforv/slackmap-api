import * as Koa from 'koa';
import * as path from 'path';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { RegisterRoutes } from './routes';

// controllers
import '../controllers/config.controller';

export class App {
    public app: Koa;
    public router: Router;

    constructor() {

        // app instance
        const app = this.app = new Koa();

        // body parser
        app.use(bodyParser());

        // router
        const router = this.router = Router();
        RegisterRoutes(router);

        app.use(router.routes());
        app.use(router.allowedMethods());

        // swagger docs
        app.use(mount('/api/v2/docs', serve(path.resolve(__dirname, '../docs'))));

        return this;
    }
}
