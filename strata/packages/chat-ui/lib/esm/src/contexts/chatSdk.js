import { ChatSdk } from "@strata-foundation/chat";
import { useProvider } from "@strata-foundation/react";
import React, { useContext, useMemo } from "react";
import { useAsync } from "react-async-hook";
export const ChatSdkContext = React.createContext({
    loading: true,
});
async function tryProm(prom) {
    try {
        return await prom;
    }
    catch (e) {
        console.error(e);
    }
    return undefined;
}
async function getSdk(provider) {
    if (!provider) {
        return undefined;
    }
    return tryProm(ChatSdk.init(provider));
}
export const ChatSdkProviderRaw = ({ children }) => {
    const { provider } = useProvider();
    const { result, loading, error } = useAsync(getSdk, [provider]);
    const sdks = useMemo(() => ({
        chatSdk: result,
        error,
        loading,
    }), [result, loading, error]);
    return (React.createElement(ChatSdkContext.Provider, { value: sdks }, children));
};
//@ts-ignore
export const ChatSdkProvider = ({ children }) => {
    //@ts-ignore
    return React.createElement(ChatSdkProviderRaw, null, children);
};
export const useChatSdk = () => {
    return useContext(ChatSdkContext);
};
//# sourceMappingURL=chatSdk.js.map