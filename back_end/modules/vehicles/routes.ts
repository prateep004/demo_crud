// src/modules/vehicles/routes.ts
import { getConnection } from "typeorm";
import { paginationWrapBuild } from "../../global/schema/pagination";
import { Vehicles } from "./entity"
import { vehicleSchema, createVehicleSchema, updateVehicleSchema, deleteVehicleSchema, vehicleSingleSchema } from "./schema";

export default async (server, options, next) => {
  server.get("", {
    schema: vehicleSchema
  },
    async (req, res) => {
      req.log.info(`list vehicles from db`);
      console.log(req?.query);

      const pagingResult = await paginationWrapBuild<Vehicles>(req, server.db.vehicles,
        {},
        { id: "ASC" }
      )

      res.send(pagingResult);
    }
  );

  server.get("/:id", {
    schema: vehicleSingleSchema
  },
    async (req, res) => {
      req.log.info(`get vehicle from db`);
      console.log(req?.params);

      const firstVehicle = await getConnection()
        .getRepository(Vehicles)
        .createQueryBuilder()
        .where("id = :id", { id: req?.params?.id })
        .getOne();

      res.send(firstVehicle);
    });

  server.post("", {
    schema: createVehicleSchema
  },
    async (req, res) => {
      req.log.info(`create vehicles from db`);
      console.log(req?.query);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Vehicles)
        .values({
          vehicle_nm: req?.query?.vehicle_nm,
          vehicle_num: req?.query?.vehicle_num,
          vehicle_engine_size: req?.query?.vehicle_engine_size,
          vehicle_engine_num: req?.query?.vehicle_engine_num
        })
        .execute();

      res.send({ message: "Successfully Created" });
    });


  server.put("/:id", {
    schema: updateVehicleSchema
  },
    async (req, res) => {
      req.log.info(`update vehicles from db`);
      console.log(req?.query,req?.params);

      await getConnection()
        .createQueryBuilder()
        .update(Vehicles)
        .set({
          vehicle_nm: req?.query?.vehicle_nm,
          vehicle_num: req?.query?.vehicle_num,
          vehicle_engine_size: req?.query?.vehicle_engine_size,
          vehicle_engine_num: req?.query?.vehicle_engine_num
        })
        .where("id = :id", { id: req?.params?.id })
        .execute();

      res.send({ message: "Successfully Update" });
    });

  server.delete("/:id", {
    schema: deleteVehicleSchema
  }, async (req, res) => {
    req.log.info(`delete vehicles from db`);
    console.log(req?.query,req?.params);

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Vehicles)
      .where("id = :id", { id: req?.params?.id })
      .execute();

    res.send({ message: "Successfully Delete" });
  });

  next()
}