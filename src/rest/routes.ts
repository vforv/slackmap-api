/* tslint:disable */
import * as express from 'express';
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { interfaces } from 'inversify';
import { ConfigController } from './controllers/config.controller';
import { AuthController } from './controllers/auth.controller';

export type Authentication = (request: any, name: any, scopes: any) => Promise<any>;

export interface Options {
    app: express.Express;
    iocContainer: interfaces.Container;
    authentication: Authentication;
}

const models: TsoaRoute.Models = {
    "ConfigModel": {
        "properties": {
            "domain": { "dataType": "string", "required": true },
            "facebook_app_id": { "dataType": "string" },
            "facebook_scope": { "dataType": "array", "array": { "dataType": "string" }, "validators": { "uniqueItems": {} } },
        },
    },
    "LocationPathModel": {
    },
    "MeModel": {
        "properties": {
            "rid": { "dataType": "string" },
            "name": { "dataType": "string" },
            "facebook_id": { "dataType": "string" },
            "email": { "dataType": "string" },
            "imperial": { "dataType": "boolean" },
            "location_path": { "ref": "LocationPathModel" },
            "first_name": { "dataType": "string" },
            "last_name": { "dataType": "string" },
            "login_at": { "dataType": "string" },
        },
    },
    "MeGetResponse": {
        "properties": {
            "me": { "ref": "MeModel", "required": true },
        },
    },
    "AuthLoginByFbResponse": {
        "properties": {
            "me": { "ref": "MeModel", "required": true },
        },
    },
    "AuthLoginByFbRequest": {
        "properties": {
            "accessToken": { "dataType": "string", "required": true },
            "signedRequest": { "dataType": "string", "required": true },
        },
    },
};

export function RegisterRoutes(options: Options) {
    options.app.get('/api/v2/config',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = options.iocContainer.get<ConfigController>(ConfigController);


            const promise = controller.get.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    options.app.get('/api/v2/auth/me',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = options.iocContainer.get<AuthController>(AuthController);


            const promise = controller.meGet.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    options.app.post('/api/v2/auth/loginByFb',
        function(request: any, response: any, next: any) {
            const args = {
                data: { "in": "body", "name": "data", "required": true, "ref": "AuthLoginByFbRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = options.iocContainer.get<AuthController>(AuthController);


            const promise = controller.loginByFb.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
