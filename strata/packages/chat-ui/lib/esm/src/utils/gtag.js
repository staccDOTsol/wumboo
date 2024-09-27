import { GA_TRACKING_ID, IS_PRODUCTION } from "../constants/globals";
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    if (GA_TRACKING_ID && IS_PRODUCTION) {
        //@ts-ignore
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    if (GA_TRACKING_ID && IS_PRODUCTION) {
        //@ts-ignore
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value,
        });
    }
};
//# sourceMappingURL=gtag.js.map