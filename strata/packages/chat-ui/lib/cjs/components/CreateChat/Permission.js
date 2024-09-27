"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const CreateChatModal_1 = require("./CreateChatModal");
const TokenForm_1 = require("./TokenForm");
const NFTForm_1 = require("./NFTForm");
const Permission = ({ state, setState, permissionType, onBack, onNext, }) => {
    // @ts-ignore
    const nftOrToken = state.wizardData[`${permissionType}Type`];
    const isNFT = nftOrToken === CreateChatModal_1.ReadPostType.NFT;
    const isToken = nftOrToken === CreateChatModal_1.ReadPostType.Token;
    const wizardKey = `${permissionType}Form`;
    const handleOnSubmit = (data) => {
        setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign({}, state.wizardData), { [wizardKey]: data }) }));
        onNext();
    };
    return (react_1.default.createElement(react_2.VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
        react_1.default.createElement(react_2.Box, null,
            react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "md" },
                isToken && (react_1.default.createElement(react_1.default.Fragment, null,
                    "Which token do you want to use to gate ",
                    permissionType,
                    " access?")),
                isNFT && (react_1.default.createElement(react_1.default.Fragment, null,
                    "What nft collection do you want to use to gate ",
                    permissionType,
                    " ",
                    "access?"))),
            react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" },
                isToken &&
                    "You can either use an existing token or create a brand new one!",
                isNFT && "Add the NFT collection key below")),
        isToken && (react_1.default.createElement(TokenForm_1.TokenForm, { onBack: onBack, onSubmit: handleOnSubmit, defaultValues: state.wizardData[wizardKey] })),
        isNFT && react_1.default.createElement(NFTForm_1.NFTForm, { onBack: onBack, onSubmit: handleOnSubmit })));
};
exports.Permission = Permission;
//# sourceMappingURL=Permission.js.map