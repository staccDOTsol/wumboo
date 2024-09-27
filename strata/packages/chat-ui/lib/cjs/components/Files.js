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
exports.Files = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const IMAGES = new Set("png,jpg,jpeg,gif,mp4,svg".split(","));
function Files({ files, onCancelFile, }) {
    const linkStyle = {
        color: "#0645AD",
        cursor: "pointer",
    };
    // Use memo here so we don't convert blobs to urls each time
    const components = (0, react_2.useMemo)(() => {
        return files
            .map(({ file, name }) => {
            const extension = name.split(".").pop();
            if (extension && IMAGES.has(extension)) {
                return {
                    key: name,
                    el: (react_2.default.createElement(react_1.Image, { mt: "4px", height: "300px", src: typeof file == "string" ? file : blobToUrl(file), alt: name })),
                    file,
                };
            }
            return {
                key: name,
                el: (react_2.default.createElement("a", { style: linkStyle, href: typeof file == "string" ? file : blobToUrl(file), rel: "noreferrer", target: "_blank" }, name)),
                file,
            };
        })
            .map(({ key, el, file }) => {
            if (onCancelFile) {
                return (react_2.default.createElement(react_1.WrapItem, { key: key },
                    react_2.default.createElement("div", { style: { position: "relative" } },
                        el,
                        react_2.default.createElement(react_1.CloseButton, { position: "absolute", right: "-18px", top: "-12px", color: "gray.400", _hover: { color: "gray.600", cursor: "pointer" }, onClick: () => onCancelFile(file) }))));
            }
            return react_2.default.createElement(react_1.WrapItem, { key: key }, el);
        });
    }, [onCancelFile, files]);
    if (files.length == 0) {
        return null;
    }
    return react_2.default.createElement(react_1.Wrap, { className: "files" }, components);
}
exports.Files = Files;
function blobToUrl(blob) {
    if (blob) {
        const urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(blob);
    }
}
//# sourceMappingURL=Files.js.map