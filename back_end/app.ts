import fastify from "fastify";
import path from "path";
import AutoLoad from "fastify-autoload";
import db from "./plugins/db";
import valid_date from "./plugins/valid_date";

export const prefix = 'api/v1';

function createServer() {

    console.log("create server fastify");
    const server = fastify({
        // logger: { prettyPrint: false },
        ajv: {
            customOptions: { allErrors: true,jsonPointers: true, $data: true },
            plugins: [
                require('ajv-errors')
            ]
        }
    });

    console.log("create server fastify-oas");
    server.register(require("fastify-oas"), {
        routePrefix: `${prefix}/docs`,
        //prefix: prefix,
        exposeRoute: true,
        swagger: {
            info: {
                title: "vehicle-tracking-back-end api",
                description: "api documentation",
                version: "0.1.0"
            },
            servers: [
                { url: "http://localhost:8080", description: "development" }
            ],
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
    });


    console.log("create register db");
    server.register(db);
    server.register(valid_date);


    console.log("create register autoLoad");

    server.register(AutoLoad, {
        dir: path.join(__dirname, 'modules'),
        options: Object.assign({ prefix: prefix }, server.options),
        indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
    });

    return server
}

export default createServer