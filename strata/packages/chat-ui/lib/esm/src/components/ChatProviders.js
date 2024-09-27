import { AcceleratorProvider, GraphqlProvider, StrataProviders, } from "@strata-foundation/react";
import React from "react";
import { ReplyProvider } from "../contexts/reply";
import { ChatSdkProvider } from "../contexts/chatSdk";
import { EmojisProvider } from "../contexts/emojis";
const defaultOnError = (error) => console.log(error);
export const ChatProviders = ({ children, onError = defaultOnError, resetCSS = false }) => (React.createElement(StrataProviders, { resetCSS: true, onError: onError },
    React.createElement(AcceleratorProvider, { url: "wss://prod-api.teamwumbo.com/accelerator" },
        React.createElement(ChatSdkProvider, null,
            React.createElement(GraphqlProvider, null,
                React.createElement(EmojisProvider, null,
                    React.createElement(ReplyProvider, null, children)))))));
//# sourceMappingURL=ChatProviders.js.map