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
exports.useEmojis = exports.EmojisProvider = exports.EmojisContext = void 0;
const react_1 = __importStar(require("react"));
exports.EmojisContext = (0, react_1.createContext)({});
const EmojisProvider = ({ children }) => {
    const [referenceMessageId, setReferenceMessageId] = (0, react_1.useState)();
    const hidePicker = (0, react_1.useCallback)(() => setReferenceMessageId(undefined), [setReferenceMessageId]);
    const showPicker = (0, react_1.useCallback)((messageId) => {
        console.log(messageId);
        setReferenceMessageId(messageId);
    }, [setReferenceMessageId]);
    return (react_1.default.createElement(exports.EmojisContext.Provider, { value: {
            referenceMessageId,
            showPicker,
            hidePicker,
        } }, children));
};
exports.EmojisProvider = EmojisProvider;
const useEmojis = () => {
    const context = (0, react_1.useContext)(exports.EmojisContext);
    if (context === undefined) {
        throw new Error("useEmojis must be used within a EmojisProvider");
    }
    return context;
};
exports.useEmojis = useEmojis;
//# sourceMappingURL=emojis.js.map