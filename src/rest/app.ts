import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import * as methodOverride from 'method-override';
import * as path from 'path';
import { expressAuthentication } from './auth';
import { AppContainer, ioc } from './ioc';
import { RegisterRoutes } from './routes';

import './controllers/config.controller';

@injectable()
export class App {
    public app: express.Express;
    public ioc: AppContainer;

    create(): express.Express {

        this.ioc = ioc;
        this.ioc.configure();

        // app instance
        const app: express.Express = this.app = express();


        app.use('/api/v2/docs', express.static(path.resolve(__dirname, 'docs')));
        app.use('/swagger.json', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'docs/swagger.json'));
        });

        // body parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride());

        // router
        RegisterRoutes({
            app,
            iocContainer: ioc,
            authentication: expressAuthentication
        });

        return app;
    }
}
