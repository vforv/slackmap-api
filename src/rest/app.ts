import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable, Container, inject } from 'inversify';
import * as methodOverride from 'method-override';
import * as path from 'path';
import { expressAuthentication } from './auth';
import { RegisterRoutes } from './routes';

import './controllers';
import { errorHandler } from './error-handler';

@injectable()
export class App {
    public app: express.Express;

    @inject(Container)
    public ioc: Container;

    create(): express.Express {

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
            iocContainer: this.ioc,
            authentication: expressAuthentication
        });


        app.use(errorHandler());
        return app;
    }
}
