import { entitiesWrapSchema } from "../../global/schema/entities"
import { queryParamsSchema } from "../../global/schema/query_params"
import { networkSuccessfullySchema } from "../../global/schema/netword.successfully"


export const itemVehiclesSchema = {
    id: { type: "number" },
    vehicle_nm: { type: "string" },
    vehicle_num: { type: "string" },
    vehicle_brand: { type: "string" },
    vehicle_engine_size: { type: "number" },
    vehicle_engine_num: { type: "string" },
    created_at: { type: "string", format: "date" },
    updated_at: { type: "string", format: "date" },
}

export const vehicleSingleSchema = {
    summary: "vehicles",
    description: "get vehicles list",
    tags: ["vehicles"],
    params: {
        type: "object",
        properties: {
            id: {
                type: "string",
            }
        }
    },
    response: {
        200: {
            type: "object",
            properties: itemVehiclesSchema
        }
    }
}

export const vehicleSchema = {
    summary: "vehicles",
    description: "get vehicles list",
    tags: ["vehicles"],
    querystring: {
        type: 'object',
        properties: {
            ...queryParamsSchema
        }
    }, response: {
        200: {
            type: "object",
            properties: entitiesWrapSchema(itemVehiclesSchema)
        }
    }
}

export const createVehicleSchema = {
    summary: "vehicles",
    description: "create vehicles",
    tags: ["vehicles"],
    body: {
        type: "object",
        properties: {
            vehicle_nm: { type: "string" },
            vehicle_brand: { type: "string" },
            vehicle_num: { type: "string" },
            vehicle_engine_size: { type: "number" },
            vehicle_engine_num: { type: "string" },
        }
    },
    // querystring: {
    //     type: 'object',
    //     properties: {
    //         vehicle_nm: { type: "string" },
    //         vehicle_num: { type: "string" },
    //         vehicle_engine_size: { type: "number" },
    //         vehicle_engine_num: { type: "string" },
    //     }
    // },
    response: {
        200: {
            type: "object",
            properties: networkSuccessfullySchema
        }
    }
}

export const updateVehicleSchema = {
    summary: "vehicles",
    description: "update vehicles",
    tags: ["vehicles"],
    params: {
        type: "object",
        properties: {
            id: {
                type: "string",
            }
        }
    },
    body: {
        type: "object",
        properties: {
            vehicle_nm: { type: "string" },
            vehicle_num: { type: "string" },
            vehicle_brand: { type: "string" },
            vehicle_engine_size: { type: "number" },
            vehicle_engine_num: { type: "string" },
        }
    },
    // querystring: {
    //     type: 'object',
    //     properties: {
    //         vehicle_nm: { type: "string" },
    //         vehicle_num: { type: "string" },
    //         vehicle_engine_size: { type: "number" },
    //         vehicle_engine_num: { type: "string" }
    //     }
    // },
    response: {
        200: {
            type: "object",
            properties: networkSuccessfullySchema
        }
    }
}

export const deleteVehicleSchema = {
    summary: "vehicles",
    description: "delete vehicles",
    tags: ["vehicles"],
    params: {
        type: "object",
        properties: {
            id: {
                type: "string",
            }
        }
    }, response: {
        200: {
            type: "object",
            properties: networkSuccessfullySchema
        }
    }
}