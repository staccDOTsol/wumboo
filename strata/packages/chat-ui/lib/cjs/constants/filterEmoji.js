"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEmoji = void 0;
//@ts-ignore
const emojiList_json_1 = __importDefault(require("./emojiList.json"));
function filterEmoji(searchText, maxResults) {
    return emojiList_json_1.default
        .filter((emoji) => {
        if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
        }
        if (emoji.keywords.includes(searchText)) {
            return true;
        }
        return false;
    })
        .slice(0, maxResults);
}
exports.filterEmoji = filterEmoji;
//# sourceMappingURL=filterEmoji.js.map