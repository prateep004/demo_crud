// src/plugins/db.ts
import "reflect-metadata";
import fp from "fastify-plugin";
import { createConnection, getConnectionOptions } from "typeorm";
import { Vehicles } from "../modules/vehicles/entity";


export default fp(async server => {
  try {

    // getConnectionOptions will read from ormconfig.js (or .env if that is prefered)
    const connectionOptions = await getConnectionOptions()
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      entities: [Vehicles]
    })
    const connection = await createConnection(connectionOptions)
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    console.log("database connected")

    console.log(`connecting to database: ${connectionOptions.type}...`)
    // this object will be accessible from any fastify server instance
    server.decorate("db", {
      queryRunner: queryRunner,
      instance: connection,
      vehicles: queryRunner.manager.getRepository(Vehicles)
    }).addHook("onClose", async (_server: any, done) => {
      console.log("database disconnected");
      _server?.db?.instance?.close();
      done();
    });
  } catch (error) {
    console.log(error,"db")
  }
})