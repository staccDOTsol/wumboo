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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmojiSearch = void 0;
const react_1 = require("react");
const data_1 = __importDefault(require("@emoji-mart/data"));
const useEmojiSearch = () => {
    const searchRef = (0, react_1.useRef)();
    const [emojis, setEmojis] = (0, react_1.useState)([]);
    const [searchMatch, setSearchMatch] = (0, react_1.useState)();
    const getCurrentlyTypedEmoji = (0, react_1.useCallback)((e) => {
        let match, text;
        if (!(match = e.currentTarget.value
            .substring(0, e.currentTarget.selectionStart)
            .match(/(^|\W):((:?\w|\+|\-)[^:]*)?$/))) {
            return null;
        }
        // @ts-ignore
        text = match[0].match(/:(.*)/)[1];
        if ((text.match(RegExp(" ", "g")) || []).length > 1) {
            return null;
        }
        return text;
    }, []);
    const reset = (0, react_1.useCallback)(() => {
        setEmojis([]);
        setSearchMatch(null);
    }, [setEmojis]);
    const search = (0, react_1.useCallback)((e) => __awaiter(void 0, void 0, void 0, function* () {
        let searchMatch = getCurrentlyTypedEmoji(e);
        if (searchMatch && searchMatch.length >= 2) {
            setSearchMatch(searchMatch);
            setEmojis(yield searchRef.current(searchMatch));
        }
        else {
            reset();
        }
    }), [searchRef, setEmojis, getCurrentlyTypedEmoji, reset]);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (!searchRef.current) {
                // @ts-ignore
                const EmojiMart = yield Promise.resolve().then(() => __importStar(require("emoji-mart")));
                // @ts-ignore
                yield EmojiMart.init({ data: data_1.default });
                // @ts-ignore
                searchRef.current = EmojiMart.SearchIndex.search;
            }
        }))();
    });
    return { emojis, searchMatch, getCurrentlyTypedEmoji, search, reset };
};
exports.useEmojiSearch = useEmojiSearch;
//# sourceMappingURL=useEmojiSearch.js.map