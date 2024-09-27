"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizardSubmit = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const defaultBondingOpts = {
    baseMint: spl_token_1.NATIVE_MINT,
    buyBaseRoyaltyPercentage: 0,
    buyTargetRoyaltyPercentage: 5,
    sellBaseRoyaltyPercentage: 0,
    sellTargetRoyaltyPercentage: 0,
    targetMintDecimals: 9,
};
const getCurveConfig = (startingPrice) => {
    const k = 1;
    const c = startingPrice * (k + 1);
    return new spl_token_bonding_1.TimeCurveConfig()
        .addCurve(0, new spl_token_bonding_1.TimeDecayExponentialCurveConfig({
        c,
        k0: 0,
        k1: 0,
        d: 1,
        interval: 0,
    }))
        .addCurve(30 * 60, // 30 minutes
    new spl_token_bonding_1.TimeDecayExponentialCurveConfig({
        c,
        k0: 0,
        k1: k,
        d: 0.5,
        interval: 1.5 * 60 * 60, // 1.5 hours
    }));
};
const getPermissionType = (typeString) => {
    if (!typeString)
        return undefined;
    return {
        native: chat_1.PermissionType.Native,
        token: chat_1.PermissionType.Token,
        nft: chat_1.PermissionType.NFT,
    }[typeString];
};
const getMetadataOpts = ({ identifier, uri, }) => new mpl_token_metadata_1.DataV2({
    name: identifier.substring(0, 32),
    symbol: identifier.substring(0, 10),
    uri,
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
});
const getJsonFile = (arg0) => new File([new Blob([JSON.stringify(arg0)], { type: "application/json" })], "file.json");
function createPermissionToken({ sdks: { chatSdk, tokenBondingSdk }, data: { wizardData: { name, identifier, postIsSameAsRead, imageUrl, readForm, postForm } }, delegateWallet, setState, isRead, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetMintKeypair = web3_js_1.Keypair.generate();
        const file = getJsonFile({
            name,
            symbol: identifier,
            description: postIsSameAsRead
                ? `Permission token for ${identifier} chat`
                : isRead ? `Read permission token for ${identifier} chat`
                    : `Post permission token for ${identifier} chat`,
            image: imageUrl,
            mint: targetMintKeypair.publicKey,
        });
        const tokenForm = isRead ? readForm : postForm;
        (0, chat_1.randomizeFileName)(file);
        let tokenPermissionKey, innerError;
        let tokenPermissionInstructions = [];
        let tokenPermissionSigners = [];
        try {
            setState({
                subStatus: `Uploading ${isRead ? 'read' : 'post'} token metadata to SHDW drive...`,
            });
            const uri = yield (0, chat_1.uploadFiles)(chatSdk.provider, [file], delegateWallet);
            if (!uri || !uri.length)
                throw new Error("Failed to upload token metadata");
            const metadata = getMetadataOpts({
                identifier: `${postIsSameAsRead ? "" : isRead ? "READ" : "POST"}${identifier}`,
                uri: uri[0],
            });
            const curveOut = yield tokenBondingSdk.initializeCurveInstructions({
                config: getCurveConfig(tokenForm.startingPrice),
            });
            const bondingOpts = Object.assign(Object.assign({}, defaultBondingOpts), { targetMint: targetMintKeypair.publicKey, curve: curveOut.output.curve });
            const metaOut = yield chatSdk.createMetadataForBondingInstructions({
                targetMintKeypair,
                metadataUpdateAuthority: chatSdk.wallet.publicKey,
                metadata,
                decimals: bondingOpts.targetMintDecimals,
            });
            const bondingOut = yield tokenBondingSdk.createTokenBondingInstructions(bondingOpts);
            tokenPermissionKey = bondingOut.output.targetMint;
            tokenPermissionInstructions.push([...curveOut.instructions, ...metaOut.instructions], bondingOut.instructions);
            tokenPermissionSigners.push([...curveOut.signers, ...metaOut.signers], bondingOut.signers);
            tokenPermissionKey = targetMintKeypair.publicKey;
        }
        catch (e) {
            innerError = e;
            setState({
                error: e,
            });
        }
        return {
            tokenPermissionKey,
            tokenPermissionInstructions,
            tokenPermissionSigners,
            innerError,
        };
    });
}
const wizardSubmit = ({ sdks, data, delegateWallet, setState, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { wizardData } = data;
    const { chatSdk, tokenBondingSdk } = sdks;
    let innerError = null;
    const { name, identifier, imageUrl } = wizardData;
    const { readForm, postForm, postIsSameAsRead } = wizardData;
    if (!chatSdk && !tokenBondingSdk)
        return;
    setState({ status: "submitting", error: undefined });
    let readPermissionType, readPermissionAmount, readPermissionKey;
    let postPermissionType, postPermissionAmount, postPermissionKey;
    let readPermissionInstructions = [], readPermissionSigners = [], postPermissionInstructions = [], postPermissionSigners = [];
    readPermissionType = getPermissionType(readForm.type);
    readPermissionAmount = readForm.amount;
    readPermissionKey =
        readForm.type === "native" || readForm.type === "token"
            ? readForm.mint
                ? new web3_js_1.PublicKey(readForm.mint)
                : undefined
            : readForm.type === "nft"
                ? new web3_js_1.PublicKey(readForm.collectionKey)
                : undefined;
    postPermissionType = getPermissionType(postForm.type);
    postPermissionAmount = postForm.amount;
    postPermissionKey =
        postForm.type === "native" || postForm.type === "token"
            ? postForm.mint
                ? new web3_js_1.PublicKey(postForm.mint)
                : undefined
            : postForm.type === "nft"
                ? new web3_js_1.PublicKey(postForm.collectionKey)
                : undefined;
    let chatMetadataUri = "";
    // Upload chat metadata json
    if (wizardData.description && wizardData.description != "") {
        try {
            setState({
                subStatus: "Uploading chat metadata to SHDW drive...",
            });
            const file = getJsonFile({
                description: wizardData.description
            });
            (0, chat_1.randomizeFileName)(file);
            chatMetadataUri = (yield (0, chat_1.uploadFiles)(chatSdk.provider, [file], delegateWallet))[0];
        }
        catch (err) {
            innerError = err;
            setState({
                error: err,
            });
        }
    }
    // Create read token if needed
    if (!readPermissionKey && !innerError) {
        readPermissionAmount = (0, spl_utils_1.toBN)(readForm.amount, defaultBondingOpts.targetMintDecimals);
        const readToken = yield createPermissionToken({ sdks, data, delegateWallet, setState, isRead: true });
        readPermissionKey = readToken.tokenPermissionKey;
        readPermissionInstructions = readToken.tokenPermissionInstructions;
        readPermissionSigners = readToken.tokenPermissionSigners;
        innerError = readToken.innerError;
    }
    // Create post token if needed
    const needsPostPermissionToken = !postPermissionKey && !innerError;
    if (needsPostPermissionToken && !postIsSameAsRead) {
        postPermissionAmount = (0, spl_utils_1.toBN)(readForm.amount, defaultBondingOpts.targetMintDecimals);
        const postToken = yield createPermissionToken({ sdks, data, delegateWallet, setState, isRead: false });
        postPermissionKey = postToken.tokenPermissionKey;
        postPermissionInstructions = postToken.tokenPermissionInstructions;
        postPermissionSigners = postToken.tokenPermissionSigners;
        innerError = postToken.innerError;
    }
    else if (needsPostPermissionToken && postIsSameAsRead) {
        postPermissionKey = readPermissionKey;
        postPermissionAmount = readPermissionAmount;
        postPermissionType = readPermissionType;
    }
    if (innerError) {
        setState({ status: undefined, subStatus: undefined });
        return;
    }
    const chatOut = yield chatSdk.initializeChatInstructions({
        name,
        identifier,
        imageUrl,
        permissions: {
            readPermissionKey: readPermissionKey,
            defaultReadPermissionAmount: readPermissionAmount,
            readPermissionType,
            postPermissionKey: postPermissionKey,
            postPermissionAmount,
            postPermissionType,
        },
        metadataUrl: chatMetadataUri,
    });
    setState({
        subStatus: `Creating ${identifier} chat...`,
    });
    try {
        yield (0, spl_utils_1.sendMultipleInstructions)(chatSdk.errors || tokenBondingSdk.errors || new Map(), chatSdk.provider, [
            ...readPermissionInstructions,
            ...postPermissionInstructions,
            ...chatOut.instructions,
        ], [
            ...readPermissionSigners,
            ...postPermissionSigners,
            ...chatOut.signers,
        ]);
        setState({ status: "success", subStatus: undefined });
    }
    catch (e) {
        setState({
            status: undefined,
            subStatus: undefined,
            error: e,
        });
    }
});
exports.wizardSubmit = wizardSubmit;
//# sourceMappingURL=wizardSubmit.js.map