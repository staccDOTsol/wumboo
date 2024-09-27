import { Text, Box, Flex, HStack, Icon, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
export function FileUploadMask() {
    return (React.createElement(Box, { position: "absolute", w: "full", h: "full", zIndex: "1000" },
        React.createElement(Flex, { w: "full", justify: "center", align: "center", h: "full", position: "absolute" },
            React.createElement(HStack, null,
                React.createElement(Icon, { w: "50px", h: "50px", as: AiOutlineCloudUpload }),
                React.createElement(Text, { fontSize: "xl", fontWeight: "semibold" }, "Upload File"))),
        React.createElement(Flex, { w: "full", h: "full", bg: useColorModeValue("white", "black"), opacity: "0.3" })));
}
//# sourceMappingURL=FileUploadMask.js.map