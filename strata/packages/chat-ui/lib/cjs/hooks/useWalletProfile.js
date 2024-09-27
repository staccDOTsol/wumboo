"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletProfile = void 0;
const react_1 = require("react");
const useProfile_1 = require("./useProfile");
const useProfileKey_1 = require("./useProfileKey");
function useWalletProfile(wallet) {
    const { key: profileKey, loading } = (0, useProfileKey_1.useProfileKey)(wallet || undefined);
    const profile = (0, useProfile_1.useProfile)(profileKey);
    return Object.assign(Object.assign({}, profile), { loading: (0, react_1.useMemo)(() => profile.loading || loading, [profile.loading, loading]) });
}
exports.useWalletProfile = useWalletProfile;
//# sourceMappingURL=useWalletProfile.js.map