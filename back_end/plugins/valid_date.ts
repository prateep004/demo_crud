import fp from "fastify-plugin"
import { validStartEndDate } from "../global/utils/customDate"

export default fp((server, opts, next) => {

    server.decorate("validDate", async (req, res) => {
        validStartEndDate(req)
    })

    next()
})
