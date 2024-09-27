import { Icon, IconButton } from "@chakra-ui/react";
import { useErrorHandler } from "@strata-foundation/react";
import React from "react";
import { useAsyncCallback } from "react-async-hook";
import { IoMdAttach } from "react-icons/io";
export function FileAttachment({ onUpload, }) {
    const hiddenFileInput = React.useRef(null);
    const { execute, loading, error } = useAsyncCallback(onUpload);
    const { handleErrors } = useErrorHandler();
    handleErrors(error);
    const handleImageChange = async (e) => {
        const files = e.target.files;
        try {
            await execute(files);
        }
        finally {
            if (hiddenFileInput.current) {
                hiddenFileInput.current.value = "";
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { multiple: true, id: "image", type: "file", onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
        React.createElement(IconButton, { isLoading: loading, "aria-label": "Select Image", variant: "outline", onClick: () => hiddenFileInput.current.click(), icon: React.createElement(Icon, { w: "24px", h: "24px", as: IoMdAttach }) })));
}
//# sourceMappingURL=FileAttachment.js.map