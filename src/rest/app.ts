import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable, Container, inject } from 'inversify';
import * as methodOverride from 'method-override';
import * as path from 'path';
import { expressAuthentication } from './auth';
import { RegisterRoutes } from './routes';
import './controllers';
import { errorHandler } from './error-handler';
import { Config } from '../config/config';
import { NODE_ENV } from '../config/index';

@injectable()
export class App {
    public app: express.Express;

    @inject(Container)
    public ioc: Container;

    create(): express.Express {

        // config
        const config: Config = this.ioc.get(Config);

        // app instance
        const app: express.Express = this.app = express();

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

        // swagger docs
        app.use('/api/v2/docs', express.static(path.resolve(__dirname, 'docs')));
        app.use('/api/v2/swagger.json', (req, res) => {
            const contract = require(path.resolve(__dirname, 'docs/swagger.json'));
            contract.host = config.domain;
            res.json(contract);
        });
        app.use('/api', (req, res) => res.redirect('/api/v2/docs'));
        app.use('/api/v2', (req, res) => res.redirect('/api/v2/docs'));

        // error handler
        app.use(errorHandler(this.ioc.get(NODE_ENV)));

        return app;
    }
}
