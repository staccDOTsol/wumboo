import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useCaseInsensitiveMarker = (caseInsensitiveMarker) => {
    const { chatSdk } = useChatSdk();
    return useAccount(caseInsensitiveMarker, chatSdk?.caseInsensitiveMarkerDecoder);
};
//# sourceMappingURL=useCaseInsensitiveMarker.js.map