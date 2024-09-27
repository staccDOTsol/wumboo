import React from "react";
import { Alert, AlertIcon, Link, Text } from "@chakra-ui/react";
export const LitProtocolWarning = () => {
    return (React.createElement(Alert, { status: "warning" },
        React.createElement(AlertIcon, null),
        React.createElement(Text, { fontSize: "sm" },
            "Do not approve any",
            " ",
            React.createElement(Link, { color: "primary.500", href: "https://litprotocol.com/" }, "Lit Protocol"),
            " ",
            "transactions on websites you do not trust. Your chat wallet is encrypted and could be decrypted if you give permission. Your chat wallet does not give access to your primary wallet, but can be used to impersonate you.")));
};
//# sourceMappingURL=LitProtocolWarning.js.map