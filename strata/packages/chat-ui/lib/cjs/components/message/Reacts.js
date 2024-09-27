"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reacts = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importDefault(require("react"));
const md_1 = require("react-icons/md");
const useInflatedReacts_1 = require("../../hooks/useInflatedReacts");
const useWalletProfile_1 = require("../../hooks/useWalletProfile");
const useUsernameFromIdentifierCertificate_1 = require("../../hooks/useUsernameFromIdentifierCertificate");
const MAX_MENTIONS_DISPLAY = 3;
function ProfileName({ sender }) {
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(sender);
    const { username } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, sender);
    const name = username || (sender && (0, react_2.truncatePubkey)(sender));
    return react_3.default.createElement(react_1.Text, null,
        name,
        " ");
}
function Reacts({ reacts, onReact, onAddReaction, }) {
    const { reacts: inflatedReacts, error: reactError, loading: reactsLoading, } = (0, useInflatedReacts_1.useInflatedReacts)(reacts);
    const { handleErrors } = (0, react_2.useErrorHandler)();
    handleErrors(reactError);
    if (inflatedReacts && inflatedReacts.length > 0) {
        return (react_3.default.createElement(react_1.HStack, { mt: 2, pt: 1 },
            inflatedReacts.map(({ emoji, messages, mine }) => (react_3.default.createElement(react_1.Popover, { matchWidth: true, trigger: "hover", key: emoji },
                react_3.default.createElement(react_1.PopoverTrigger, null,
                    react_3.default.createElement(react_1.Button, { onClick: () => onReact(emoji, mine), borderLeftRadius: "20px", width: "55px", borderRightRadius: "20px", p: 0, variant: mine ? "solid" : "outline", size: "sm", key: emoji },
                        react_3.default.createElement(react_1.HStack, { spacing: 1 },
                            react_3.default.createElement(react_1.Text, { lineHeight: 0, fontSize: "lg" }, emoji),
                            react_3.default.createElement(react_1.Text, { lineHeight: 0, fontSize: "sm" }, messages.length)))),
                react_3.default.createElement(react_1.PopoverContent, { width: "fit-content", fontSize: "xs", borderRadius: "md", bg: "gray.200", border: 0, color: "black", py: 0, px: 0, _dark: {
                        bg: "gray.700",
                        color: "white",
                    } },
                    react_3.default.createElement(react_1.PopoverBody, null,
                        react_3.default.createElement(react_1.HStack, { spacing: 1 },
                            messages
                                .slice(0, MAX_MENTIONS_DISPLAY)
                                .map((message, index) => (react_3.default.createElement(react_1.HStack, { key: message.id, spacing: 0 },
                                react_3.default.createElement(ProfileName, { sender: message.sender }),
                                messages.length - 1 != index && react_3.default.createElement(react_1.Text, null, ", ")))),
                            messages.length > MAX_MENTIONS_DISPLAY && (react_3.default.createElement(react_1.Text, null,
                                "and ",
                                messages.length - MAX_MENTIONS_DISPLAY,
                                " others")))))))),
            react_3.default.createElement(react_1.Button, { borderLeftRadius: "20px", width: "55px", borderRightRadius: "20px", variant: "outline", size: "sm", onClick: onAddReaction },
                react_3.default.createElement(react_1.Icon, { as: md_1.MdOutlineAddReaction }))));
    }
    return react_3.default.createElement("div", null);
}
exports.Reacts = Reacts;
//# sourceMappingURL=Reacts.js.map