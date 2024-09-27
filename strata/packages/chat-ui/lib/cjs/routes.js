"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.routes = void 0;
const globals_1 = require("./constants/globals");
exports.routes = {
    landing: { path: "/", params: [] },
    chats: {
        path: "/c",
        params: []
    },
    chat: {
        path: "/c/:id",
        params: ["id"],
    },
    fullyManagedLaunchpad: {
        path: `${globals_1.SITE_URL}/launchpad/full-managed/new`,
        params: [],
    },
};
function rmUndefined(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] !== "undefined")
            acc[key] = obj[key];
        return acc;
    }, {});
}
function route(route, params = {}) {
    const subbed = route.params.reduce((acc, param) => {
        if (params[param]) {
            const ret = acc.replaceAll(`:${param}`, params[param]);
            delete params[param];
            return ret;
        }
        return acc;
    }, route.path);
    const search = typeof window != "undefined" && window.location.search;
    const currQuery = new URLSearchParams(search || "");
    const cluster = currQuery.get("cluster");
    if (cluster && !params.cluster) {
        params.cluster = cluster;
    }
    const nextQuery = new URLSearchParams(rmUndefined(params)).toString();
    return subbed + (nextQuery ? `?${nextQuery}` : "");
}
exports.route = route;
//# sourceMappingURL=routes.js.map