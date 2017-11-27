import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { RegisterRoutes } from './routes';
import { AppContainer, iocContainer } from 'app/ioc';

// controllers
import '../controllers/config.controller';

export class App {
    public app: express.Express;
    public ioc: AppContainer;
    constructor() {

        this.ioc = iocContainer;
        this.ioc.setup();

        // app instance
        const app: express.Express = this.app = express();


        app.use('/api/v2/docs', express.static(path.resolve(__dirname, '../docs')));
        app.use('/swagger.json', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../docs/swagger.json'));
        });

        // body parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride());

        // router
        RegisterRoutes(app);

        return this;
    }
}
