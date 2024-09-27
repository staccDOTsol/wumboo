"use strict";
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
exports.FileAttachment = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importDefault(require("react"));
const react_async_hook_1 = require("react-async-hook");
const io_1 = require("react-icons/io");
function FileAttachment({ onUpload, }) {
    const hiddenFileInput = react_3.default.useRef(null);
    const { execute, loading, error } = (0, react_async_hook_1.useAsyncCallback)(onUpload);
    const { handleErrors } = (0, react_2.useErrorHandler)();
    handleErrors(error);
    const handleImageChange = (e) => __awaiter(this, void 0, void 0, function* () {
        const files = e.target.files;
        try {
            yield execute(files);
        }
        finally {
            if (hiddenFileInput.current) {
                hiddenFileInput.current.value = "";
            }
        }
    });
    return (react_3.default.createElement(react_3.default.Fragment, null,
        react_3.default.createElement("input", { multiple: true, id: "image", type: "file", onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
        react_3.default.createElement(react_1.IconButton, { isLoading: loading, "aria-label": "Select Image", variant: "outline", onClick: () => hiddenFileInput.current.click(), icon: react_3.default.createElement(react_1.Icon, { w: "24px", h: "24px", as: io_1.IoMdAttach }) })));
}
exports.FileAttachment = FileAttachment;
//# sourceMappingURL=FileAttachment.js.map