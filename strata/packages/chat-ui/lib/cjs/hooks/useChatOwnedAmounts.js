"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatOwnedAmounts = void 0;
const react_1 = require("@strata-foundation/react");
const useChatPermissionsFromChat_1 = require("./useChatPermissionsFromChat");
const useChatOwnedAmounts = (wallet, chatKey) => {
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const { readPermissionKey, readPermissionType, postPermissionKey, postPermissionType, } = Object.assign({}, chatPermissions);
    const { amount: ownedReadAmountNft, loading: loading1 } = (0, react_1.useCollectionOwnedAmount)(readPermissionKey);
    const { amount: ownedPostAmountNft, loading: loading2 } = (0, react_1.useCollectionOwnedAmount)(postPermissionKey);
    const ownedReadAmountToken = (0, react_1.useUserOwnedAmount)(wallet, readPermissionKey);
    const ownedPostAmountToken = (0, react_1.useUserOwnedAmount)(wallet, postPermissionKey);
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
exports.useChatOwnedAmounts = useChatOwnedAmounts;
//# sourceMappingURL=useChatOwnedAmounts.js.map