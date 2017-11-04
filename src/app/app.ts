import * as Koa from 'koa'
import * as path from 'path'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import {RegisterRoutes} from './routes'

// controllers
import "../controllers/config.controller"

// app instance
export const app = new Koa();

// body parser
app.use(bodyParser())

// router
const router = Router();
RegisterRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(mount('/api/v2/docs', serve(path.resolve(__dirname, '../docs'))))
