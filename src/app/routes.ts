/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './ioc';
import { ConfigController } from './../controllers/config.controller';

const models: TsoaRoute.Models = {
    "ConfigModel": {
        "properties": {
            "domain": { "dataType": "string", "required": true, "validators": { "minLength": { "value": 5 }, "maxLength": { "value": 10 } } },
            "facebook_app_id": { "dataType": "double", "validators": { "maximum": { "value": 100 } } },
            "facebook_app_id2": { "dataType": "double", "validators": { "isFloat": { "errorMsg": "Invalid float error message." } } },
            "facebook_scope": { "dataType": "array", "array": { "dataType": "string" }, "validators": { "maxItems": { "value": 5 }, "uniqueItems": {} } },
            "sub": { "ref": "ConfigModel" },
        },
    },
};

export function RegisterRoutes(router: any) {
    router.get('/api/v2/config',
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = iocContainer.get<ConfigController>(ConfigController);

            const promise = controller.get.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/api/v2/config',
        async (context, next) => {
            const args = {
                data: { "in": "body", "name": "data", "required": true, "ref": "ConfigModel" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = iocContainer.get<ConfigController>(ConfigController);

            const promise = controller.post.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });


    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controller.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.body = error;
                next();
            });
    }

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return ValidateParam(args[key], context.request.query[name], models, name, errorFields)
                case 'path':
                    return ValidateParam(args[key], context.params[name], models, name, errorFields)
                case 'header':
                    return ValidateParam(args[key], context.request.headers[name], models, name, errorFields);
                case 'body':
                    return ValidateParam(args[key], context.request.body, models, name, errorFields, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], context.request.body[name], models, name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}
