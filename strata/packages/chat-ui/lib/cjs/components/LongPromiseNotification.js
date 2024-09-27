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
exports.LongPromiseNotification = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
function LongPromiseNotification({ onComplete, onError, exec, estTimeMillis, text }) {
    const [time, setTime] = (0, react_3.useState)(0);
    const { result, error } = (0, react_async_hook_1.useAsync)(exec, []);
    (0, react_3.useEffect)(() => {
        if (onComplete && result) {
            onComplete(result);
        }
    }, [result, onComplete]);
    (0, react_3.useEffect)(() => {
        if (onError && error) {
            onError(error);
        }
    }, [error, onError]);
    (0, react_2.useInterval)(() => {
        setTime(time => time + 100);
    }, 100);
    return (react_3.default.createElement(react_1.Alert, { w: "290px", bgColor: "black.300", borderTop: "1px", borderTopColor: "gray.600", rounded: "lg", fontFamily: "body", color: "white", status: "success", flexDirection: "column", p: 0 },
        react_3.default.createElement(react_1.Box, { w: "full" },
            react_3.default.createElement(react_1.Progress, { value: Math.min(time / estTimeMillis, 95) * 100 })),
        react_3.default.createElement(react_1.VStack, { align: "left", w: "full", p: 2, spacing: 1 },
            react_3.default.createElement(react_1.Text, { color: "gray.400" }, text))));
}
exports.LongPromiseNotification = LongPromiseNotification;
;
//# sourceMappingURL=LongPromiseNotification.js.map