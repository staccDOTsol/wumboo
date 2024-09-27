import { Text, HStack, Box, Icon, IconButton, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
import { Notification } from "@strata-foundation/react";
import toast from "react-hot-toast";
import { BsClipboard } from "react-icons/bs";
export function CopyBlackBox({ text, ...rest }) {
    return (React.createElement(Box, { p: 4, rounded: "lg", bg: useColorModeValue("gray.200", "gray.800"), ...rest },
        React.createElement(HStack, { justify: "space-between" },
            React.createElement(Text, null, text),
            React.createElement(IconButton, { variant: "ghost", colorScheme: "primary", "aria-label": "Copy to Clipboard", onClick: () => {
                    navigator.clipboard.writeText(text);
                    toast.custom((t) => (React.createElement(Notification, { show: t.visible, type: "info", heading: "Copied to Clipboard", message: text, onDismiss: () => toast.dismiss(t.id) })));
                }, icon: React.createElement(Icon, { as: BsClipboard }) }))));
}
//# sourceMappingURL=CopyBlackBox.js.map