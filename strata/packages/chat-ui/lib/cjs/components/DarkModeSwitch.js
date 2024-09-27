"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkModeSwitch = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const io5_1 = require("react-icons/io5");
const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = (0, react_2.useColorMode)();
    const isDark = colorMode === "dark";
    return (react_1.default.createElement(react_2.Switch, { position: "fixed", top: "1rem", right: "1rem", isChecked: isDark, onChange: toggleColorMode },
        react_1.default.createElement(react_2.Icon, { as: isDark ? io5_1.IoMoon : io5_1.IoSunny, color: isDark ? "white" : "black" })));
};
exports.DarkModeSwitch = DarkModeSwitch;
//# sourceMappingURL=DarkModeSwitch.js.map