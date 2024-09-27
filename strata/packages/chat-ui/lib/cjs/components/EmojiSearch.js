"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiSearch = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const filterEmoji_1 = require("../constants/filterEmoji");
const EmojiSearch = ({ onSelect }) => {
    const [search, setSearch] = (0, react_2.useState)("");
    const emojis = (0, react_2.useMemo)(() => (0, filterEmoji_1.filterEmoji)(search, 10), [search]);
    const [focusIndex, setFocusIndex] = (0, react_2.useState)(0);
    (0, react_2.useEffect)(() => {
        if (emojis.length - 1 < focusIndex && emojis.length != 0) {
            setFocusIndex(emojis.length - 1);
        }
    }, [emojis]);
    return (react_2.default.createElement(react_1.VStack, { w: "full", justify: "stretch" },
        react_2.default.createElement(react_1.Input, { onKeyDown: (e) => {
                if (e.key == "Enter" && emojis[focusIndex]) {
                    onSelect(emojis[focusIndex]);
                }
                else if (e.key == "ArrowRight") {
                    setFocusIndex((i) => i == emojis.length - 1 ? emojis.length - 1 : i + 1);
                }
                else if (e.key == "ArrowLeft") {
                    setFocusIndex((i) => (i == 0 ? 0 : i - 1));
                }
            }, autoFocus: true, onChange: (e) => setSearch(e.target.value), value: search, placeholder: "Search..." }),
        react_2.default.createElement(react_1.HStack, { overflow: "auto", w: "full" }, emojis.map((emoji, index) => (react_2.default.createElement(react_1.Button, { border: focusIndex === index ? "1px solid gray" : undefined, variant: "ghost", key: emoji.title, onClick: () => onSelect(emoji), "aria-label": emoji.title }, emoji.symbol))))));
};
exports.EmojiSearch = EmojiSearch;
//# sourceMappingURL=EmojiSearch.js.map