/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './ioc';
import { ConfigController } from './../controllers/config.controller';
import { expressAuthentication } from './auth';

const models: TsoaRoute.Models = {
    "ConfigModel": {
        "properties": {
            "domain": { "dataType": "string", "required": true },
            "facebook_app_id": { "dataType": "string" },
            "facebook_scope": { "dataType": "array", "array": { "dataType": "string" }, "validators": { "uniqueItems": {} } },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/api/v2/config',
        authenticateMiddleware([{ "name": "api_token" }]),
        function(request: any, response: any, next: any) {
            const args = {
                token: { "in": "query", "name": "api_token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ConfigController>(ConfigController);


            const promise = controller.get.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/v2/config',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["admin"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                data: { "in": "body", "name": "data", "required": true, "ref": "ConfigModel" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ConfigController>(ConfigController);


            const promise = controller.post.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, response: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                expressAuthentication(request, secMethod.name, secMethod.scopes).then((user: any) => {
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        request['user'] = user;
                        next();
                    }
                })
                    .catch((error: any) => {
                        responded++;
                        if (responded == security.length && !success) {
                            response.status(401);
                            next(error)
                        }
                    })
            }
        }
    }

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
