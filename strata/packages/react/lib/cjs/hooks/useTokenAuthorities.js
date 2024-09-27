"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenAuthorities = void 0;
const useMetaplexMetadata_1 = require("./useMetaplexMetadata");
/**
 * Get all metaplex metadata around a token and information about whether the public key holds any authorities
 *
 * @param token
 * @returns
 */
function useTokenAuthorities(mint, wallet) {
    var _a, _b, _c, _d, _e;
    const allMetadata = (0, useMetaplexMetadata_1.useMetaplexTokenMetadata)(mint);
    const hasUpdateAuth = !!(wallet && ((_a = allMetadata.metadata) === null || _a === void 0 ? void 0 : _a.updateAuthority) == (wallet === null || wallet === void 0 ? void 0 : wallet.toString()));
    const hasMintAuth = !!(wallet && ((_b = allMetadata.mint) === null || _b === void 0 ? void 0 : _b.mintAuthority) && ((_c = allMetadata.mint) === null || _c === void 0 ? void 0 : _c.mintAuthority.equals(wallet)));
    const hasFreezeAuth = !!(wallet && ((_d = allMetadata.mint) === null || _d === void 0 ? void 0 : _d.freezeAuthority) && ((_e = allMetadata.mint) === null || _e === void 0 ? void 0 : _e.freezeAuthority.equals(wallet)));
    return Object.assign(Object.assign({}, allMetadata), { hasUpdateAuth,
        hasMintAuth,
        hasFreezeAuth, hasAnyAuth: hasUpdateAuth || hasMintAuth || hasFreezeAuth });
}
exports.useTokenAuthorities = useTokenAuthorities;
//# sourceMappingURL=useTokenAuthorities.js.map