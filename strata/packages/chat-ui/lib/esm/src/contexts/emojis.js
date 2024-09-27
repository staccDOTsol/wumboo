import React, { createContext, useContext, useState, useCallback, } from "react";
export const EmojisContext = createContext({});
const EmojisProvider = ({ children }) => {
    const [referenceMessageId, setReferenceMessageId] = useState();
    const hidePicker = useCallback(() => setReferenceMessageId(undefined), [setReferenceMessageId]);
    const showPicker = useCallback((messageId) => {
        console.log(messageId);
        setReferenceMessageId(messageId);
    }, [setReferenceMessageId]);
    return (React.createElement(EmojisContext.Provider, { value: {
            referenceMessageId,
            showPicker,
            hidePicker,
        } }, children));
};
const useEmojis = () => {
    const context = useContext(EmojisContext);
    if (context === undefined) {
        throw new Error("useEmojis must be used within a EmojisProvider");
    }
    return context;
};
export { EmojisProvider, useEmojis };
//# sourceMappingURL=emojis.js.map