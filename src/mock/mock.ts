import {mockIocFactory} from './mock-ioc';
import {App} from '../rest/app';

const ioc = mockIocFactory();

const app: App = ioc.get(App);

app.create().listen(3000);
