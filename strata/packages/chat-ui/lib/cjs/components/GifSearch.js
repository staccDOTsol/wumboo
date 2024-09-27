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
exports.GifSearch = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const react_components_1 = require("@giphy/react-components");
const globals_1 = require("../constants/globals");
function GifSearch({ onSelect }) {
    return (react_2.default.createElement(react_components_1.SearchContextManager, { apiKey: globals_1.GIPHY_API_KEY },
        react_2.default.createElement(Components, { onSelect: onSelect })));
}
exports.GifSearch = GifSearch;
// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const Components = ({ onSelect }) => {
    //@ts-ignore
    const { fetchGifs, searchKey } = (0, react_2.useContext)(react_components_1.SearchContext);
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(react_components_1.SearchBar, null),
        react_2.default.createElement(react_1.Box, { w: "full", mt: 2 },
            react_2.default.createElement(react_components_1.SuggestionBar, null)),
        react_2.default.createElement(react_1.Box, { maxH: "500px", overflow: "auto", mt: 4 },
            react_2.default.createElement(react_components_1.Grid, { key: searchKey, columns: 3, width: 625, fetchGifs: fetchGifs, onGifClick: (gif, e) => {
                    e.preventDefault();
                    onSelect(String(gif.id));
                } }))));
};
//# sourceMappingURL=GifSearch.js.map