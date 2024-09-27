"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = exports.pageview = void 0;
const globals_1 = require("../constants/globals");
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
    if (globals_1.GA_TRACKING_ID && globals_1.IS_PRODUCTION) {
        //@ts-ignore
        window.gtag("config", globals_1.GA_TRACKING_ID, {
            page_path: url,
        });
    }
};
exports.pageview = pageview;
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }) => {
    if (globals_1.GA_TRACKING_ID && globals_1.IS_PRODUCTION) {
        //@ts-ignore
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value,
        });
    }
};
exports.event = event;
//# sourceMappingURL=gtag.js.map