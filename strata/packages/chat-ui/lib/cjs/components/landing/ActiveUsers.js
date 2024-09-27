"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUsers = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
require("react-responsive-carousel/lib/styles/carousel.min.css"); // requires a loader
const ActiveUsers = ({ num, fontSize = "15px", }) => (react_1.default.createElement(react_2.Badge, { color: "white", position: "absolute", top: "16px", left: "16px", rounded: "full", p: "10px", background: "gray.600", fontSize: fontSize, lineHeight: fontSize, fontWeight: "bold" },
    react_1.default.createElement(react_2.HStack, { spacing: 1 },
        react_1.default.createElement(react_2.Circle, { background: "#67FF92", size: "8px" }),
        react_1.default.createElement(react_2.Text, null,
            num,
            " Active"))));
exports.ActiveUsers = ActiveUsers;
//# sourceMappingURL=ActiveUsers.js.map