import React, { createContext, useContext, useState, useCallback, } from "react";
export const ReplyContext = createContext({});
export const ReplyProvider = ({ children }) => {
    const [replyMessage, setReplyMessage] = useState();
    const hideReply = useCallback(() => setReplyMessage(undefined), [setReplyMessage]);
    const showReply = useCallback((reply) => {
        setReplyMessage(reply);
    }, [setReplyMessage]);
    return (React.createElement(ReplyContext.Provider, { value: {
            replyMessage,
            showReply,
            hideReply,
        } }, children));
};
export const useReply = () => {
    const context = useContext(ReplyContext);
    if (context === undefined) {
        throw new Error("useReply must be used within a ReplyProvider");
    }
    return context;
};
//# sourceMappingURL=reply.js.map