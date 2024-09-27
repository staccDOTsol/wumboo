import { useCollectionOwnedAmount, useUserOwnedAmount, } from "@strata-foundation/react";
import { useChatPermissionsFromChat } from "./useChatPermissionsFromChat";
export const useChatOwnedAmounts = (wallet, chatKey) => {
    const { info: chatPermissions } = useChatPermissionsFromChat(chatKey);
    const { readPermissionKey, readPermissionType, postPermissionKey, postPermissionType, } = { ...chatPermissions };
    const { amount: ownedReadAmountNft, loading: loading1 } = useCollectionOwnedAmount(readPermissionKey);
    const { amount: ownedPostAmountNft, loading: loading2 } = useCollectionOwnedAmount(postPermissionKey);
    const ownedReadAmountToken = useUserOwnedAmount(wallet, readPermissionKey);
    const ownedPostAmountToken = useUserOwnedAmount(wallet, postPermissionKey);
    return {
        isSame: readPermissionKey && postPermissionKey
            ? readPermissionKey.equals(postPermissionKey)
            : undefined,
        ownedReadAmount: Object.keys(readPermissionType || {})[0] == "nft"
            ? ownedReadAmountNft
            : ownedReadAmountToken,
        ownedPostAmount: Object.keys(postPermissionType || {})[0] == "nft"
            ? ownedPostAmountNft
            : ownedPostAmountToken,
        loading: loading1 || loading2,
    };
};
//# sourceMappingURL=useChatOwnedAmounts.js.map