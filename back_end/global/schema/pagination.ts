import { FindConditions, ObjectLiteral, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { Entities } from './entities';


export const paginationSchema = {
    size: { type: "number" },
    page: { type: "number" },
    total_number_of_entities: { type: "number" },
    total_number_of_pages: { type: "number" },
}

export async function paginationWrapBuild<T>(req,
    repository: Repository<T>,
    where?: FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string,
    order?: {
        [P in EntityFieldsNames<T>]?: "ASC" | "DESC" | 1 | -1;
    },
    relations?: string[]): Promise<Entities<T>> {
    const page = (req?.query?.page ?? 0) > 0 ? req?.query?.page : 1;
    const size = (req?.query?.size ?? 0) > 0 ? req?.query?.size : 10;

    const [result, total] = await repository.findAndCount(
        {
            relations: relations,
            where: where,
            order: order,
            take: size,
            skip: (page - 1) * size
        }
    );
    
    // console.log('>>>>>>>>>>>>>>');
    // console.log(result)
    // console.log('<<<<<<<<<<<<<<');
    return {
        entities: result ?? [],
        page_information: {
            page: page,
            size: size,
            total_number_of_entities: total,
            total_number_of_pages: Math.ceil(total / size)
        }
    }
    // builder.
}

export async function paginationWrapQueryBuild<T>(req,
    query: QueryBuilder<T> | SelectQueryBuilder<T>):
    Promise<Entities<T>> {

    const page = (req?.query?.page ?? 0) > 0 ? req?.query?.page : 1;
    const size = (req?.query?.size ?? 0) > 0 ? req?.query?.size : 10;

    // const total = await query.select('*').getCount();
    // .take(size).skip((page - 1) * size)


    let [result, total]: [T[], number] = [[], 0];

    if (query instanceof SelectQueryBuilder) {

        [result, total] = [await query.take(size).skip((page - 1) * size).getRawMany(),
        (await query.select("count(TopSlaes.total_sale) as total")?.getRawOne() as any)?.total
        ];
    }
    else if (query instanceof QueryBuilder) {
        [result, total] = await query.select().take(size).skip((page - 1) * size).getManyAndCount();
    }



    return {
        entities: result ?? [],
        page_information: {
            page: page,
            size: size,
            total_number_of_entities: total,
            total_number_of_pages: Math.ceil(total / size)
        }
    }
}