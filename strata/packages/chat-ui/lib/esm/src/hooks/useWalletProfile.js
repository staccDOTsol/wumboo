import { useMemo } from "react";
import { useProfile } from "./useProfile";
import { useProfileKey } from "./useProfileKey";
export function useWalletProfile(wallet) {
    const { key: profileKey, loading } = useProfileKey(wallet || undefined);
    const profile = useProfile(profileKey);
    return {
        ...profile,
        loading: useMemo(() => profile.loading || loading, [profile.loading, loading])
    };
}
//# sourceMappingURL=useWalletProfile.js.map