"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadMask = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const ai_1 = require("react-icons/ai");
function FileUploadMask() {
    return (react_2.default.createElement(react_1.Box, { position: "absolute", w: "full", h: "full", zIndex: "1000" },
        react_2.default.createElement(react_1.Flex, { w: "full", justify: "center", align: "center", h: "full", position: "absolute" },
            react_2.default.createElement(react_1.HStack, null,
                react_2.default.createElement(react_1.Icon, { w: "50px", h: "50px", as: ai_1.AiOutlineCloudUpload }),
                react_2.default.createElement(react_1.Text, { fontSize: "xl", fontWeight: "semibold" }, "Upload File"))),
        react_2.default.createElement(react_1.Flex, { w: "full", h: "full", bg: (0, react_1.useColorModeValue)("white", "black"), opacity: "0.3" })));
}
exports.FileUploadMask = FileUploadMask;
//# sourceMappingURL=FileUploadMask.js.map