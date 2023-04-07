const { knex } = require('../connectors')

module.exports = class Log {
    constructor({
        path,
        matched_route: matchedRoute,
        method,
        user,
        status,
        request,
        response,
        client_ip
    }) {
        this.path = path
        this.matched_route = matchedRoute
        this.method = method
        this.client_ip = client_ip
        this.user = user
        this.status = status
        this.request =
            typeof request === 'object' ? JSON.stringify(request) : request
        this.response =
            typeof response === 'object' ? JSON.stringify(response) : response
    }

    toJson() {
        return JSON.parse(JSON.stringify(this))
    }

    async createLog() {
        return knex('action_logs').insert(this.toJson())
    }

    static async fetchLogByPath({ operator, path }) {
        return knex('action_logs')
            .select('*')
            .where('path', operator, path)
    }
}
