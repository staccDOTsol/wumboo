"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRATA_KEY = exports.CHAT_URL = exports.DOCS_URL = exports.SITE_URL = exports.VISIBLE_CHATS = exports.GIPHY_API_KEY = exports.IS_PRODUCTION = exports.GA_TRACKING_ID = exports.SOLANA_URL = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.SOLANA_URL = process.env.NEXT_PUBLIC_SOLANA_URL || "https://devnet.genesysgo.net/";
exports.GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "G-M3SKCH92NY";
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
exports.VISIBLE_CHATS = ["solana", "open"];
exports.SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
exports.DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;
exports.CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL;
exports.STRATA_KEY = new web3_js_1.PublicKey("BoA7rbEV5vgS5wQXwXrmf7j6cSao8pBToiZ45eHvo52L");
//# sourceMappingURL=globals.js.map