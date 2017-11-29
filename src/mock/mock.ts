import {ioc} from '../ioc';
import {App} from '../rest/app';
import {configure as appIocConfigure} from '../rest/app-ioc';
import {configure as mockIocConfigure} from './mock-ioc';

appIocConfigure(ioc);
mockIocConfigure(ioc);

const app: App = ioc.get(App);

app.create().listen(3000);
