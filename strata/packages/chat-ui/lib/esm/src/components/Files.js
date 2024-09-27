import { CloseButton, Image, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useMemo } from "react";
const IMAGES = new Set("png,jpg,jpeg,gif,mp4,svg".split(","));
export function Files({ files, onCancelFile, }) {
    const linkStyle = {
        color: "#0645AD",
        cursor: "pointer",
    };
    // Use memo here so we don't convert blobs to urls each time
    const components = useMemo(() => {
        return files
            .map(({ file, name }) => {
            const extension = name.split(".").pop();
            if (extension && IMAGES.has(extension)) {
                return {
                    key: name,
                    el: (React.createElement(Image, { mt: "4px", height: "300px", src: typeof file == "string" ? file : blobToUrl(file), alt: name })),
                    file,
                };
            }
            return {
                key: name,
                el: (React.createElement("a", { style: linkStyle, href: typeof file == "string" ? file : blobToUrl(file), rel: "noreferrer", target: "_blank" }, name)),
                file,
            };
        })
            .map(({ key, el, file }) => {
            if (onCancelFile) {
                return (React.createElement(WrapItem, { key: key },
                    React.createElement("div", { style: { position: "relative" } },
                        el,
                        React.createElement(CloseButton, { position: "absolute", right: "-18px", top: "-12px", color: "gray.400", _hover: { color: "gray.600", cursor: "pointer" }, onClick: () => onCancelFile(file) }))));
            }
            return React.createElement(WrapItem, { key: key }, el);
        });
    }, [onCancelFile, files]);
    if (files.length == 0) {
        return null;
    }
    return React.createElement(Wrap, { className: "files" }, components);
}
function blobToUrl(blob) {
    if (blob) {
        const urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(blob);
    }
}
//# sourceMappingURL=Files.js.map