import { Pagination } from "../models/pagination/pagination.model";
import { paginationSchema } from "./pagination";

export interface Entities<T> {
    entities: Array<T>,
    page_information?: Pagination
}

export function entitiesWrapSchema(schema = null) {
    return {
        entities: {
            type: "array", items: {
                properties: schema ?? []
            }
        },
        page_information: { type: "object", properties: paginationSchema }
    }
}