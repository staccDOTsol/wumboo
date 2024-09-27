import React from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import { ReadPostType } from "./CreateChatModal";
import { TokenForm } from "./TokenForm";
import { NFTForm } from "./NFTForm";
export const Permission = ({ state, setState, permissionType, onBack, onNext, }) => {
    // @ts-ignore
    const nftOrToken = state.wizardData[`${permissionType}Type`];
    const isNFT = nftOrToken === ReadPostType.NFT;
    const isToken = nftOrToken === ReadPostType.Token;
    const wizardKey = `${permissionType}Form`;
    const handleOnSubmit = (data) => {
        setState({
            ...state,
            wizardData: {
                ...state.wizardData,
                [wizardKey]: data,
            },
        });
        onNext();
    };
    return (React.createElement(VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
        React.createElement(Box, null,
            React.createElement(Text, { fontWeight: "bold", fontSize: "md" },
                isToken && (React.createElement(React.Fragment, null,
                    "Which token do you want to use to gate ",
                    permissionType,
                    " access?")),
                isNFT && (React.createElement(React.Fragment, null,
                    "What nft collection do you want to use to gate ",
                    permissionType,
                    " ",
                    "access?"))),
            React.createElement(Text, { fontSize: "xs", fontWeight: "normal" },
                isToken &&
                    "You can either use an existing token or create a brand new one!",
                isNFT && "Add the NFT collection key below")),
        isToken && (React.createElement(TokenForm, { onBack: onBack, onSubmit: handleOnSubmit, defaultValues: state.wizardData[wizardKey] })),
        isNFT && React.createElement(NFTForm, { onBack: onBack, onSubmit: handleOnSubmit })));
};
//# sourceMappingURL=Permission.js.map