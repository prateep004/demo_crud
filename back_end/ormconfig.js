// ormconfig.js
module.exports = {
    type: "mysql",
    port: 3306,
    host: "185.78.164.113",
    username: "wipresou_crudifyc",
    password: "ZmjRV3om",
    database: "wipresou_crudifyc",
    logging: false,
    entities: [
      "modules/*/entity.ts",
      "modules/*/entity-*.ts"
    ],
    migrations: ["migration/*.ts"],
    cli: {
      migrationsDir: "migration",
    },
  }